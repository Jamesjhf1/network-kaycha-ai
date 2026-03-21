# NAKIVO Backup & Replication — Bandwidth Throttle Policy
## Kaycha Labs — 9 Remote Sites → QNAP @ HQ (Miramar, FL)

---

## Architecture Summary

| Component | Details |
|-----------|---------|
| **Backup Target** | QNAP TVS-h1674X — 12x 20TB IronWolf Pro — RAID 6 — 180TB usable |
| **WAN Gateway** | Ubiquiti EdgeRouter 4 — eth0 (WAN 300Mbps) / eth1 (LAN) |
| **Backup Software** | NAKIVO Backup & Replication — Director on TCP 4443 |
| **Total Endpoints** | ~200 PCs across 9 remote labs |
| **Total Data** | ~40TB initial seed |
| **Daily Incremental** | ~1TB (5% change rate across 200 PCs) |

---

## Initial Seed Strategy

**DO NOT seed over WAN.** At 300 Mbps, a 40TB seed would saturate the pipe for ~12 days.

### Seed-to-Device Workflow (per site)

| Phase | Action | Duration |
|-------|--------|----------|
| 1. Local Backup | Install NAKIVO agent, run full backup to local USB drive | 1–2 days per site |
| 2. Ship Drives | FedEx/UPS external drive to HQ (Miramar, FL) | 2–3 days |
| 3. Import to QNAP | Connect drive to QNAP USB, import via NAKIVO Seed Import | 4–8 hours per site |
| 4. Switch to WAN | Configure incremental backups over WAN | Immediate |

**Priority order for seeding** (largest sites first):
1. FL/HQ (local — no shipping needed)
2. MA — Natick (26 PCs, 5.2 TB)
3. NJ — Riverdale (24 PCs, 4.8 TB)
4. CO — Denver (22 PCs, 4.4 TB)
5. NY — Albany (20 PCs, 4.0 TB)
6. NV — Las Vegas (18 PCs, 3.6 TB)
7. AZ — Tempe (16 PCs, 3.2 TB)
8. MD — Woodlawn (15 PCs, 3.0 TB)
9. NC — Cherokee (12 PCs, 2.4 TB)

---

## Bandwidth Throttle Policy

### ER4 QoS Summary

| Parameter | Value |
|-----------|-------|
| Total WAN Upload | 300 Mbps |
| NAKIVO Max (business hours) | 200 Mbps aggregate |
| Business Traffic Reserved | 100 Mbps minimum |
| NAKIVO Max (after hours) | 300 Mbps (full pipe) |

### Per-Site Bandwidth Allocation (Business Hours: 6AM–8PM)

| Site | Upload (ISP) | NAKIVO Allocation | Notes |
|------|-------------|-------------------|-------|
| CO — Denver | 100 Mbps | 50 Mbps | Fiber |
| NV — Las Vegas | 50 Mbps | 50 Mbps | ISP-limited |
| NY — Albany | 35 Mbps | 35 Mbps | Cable — ISP-limited |
| AZ — Tempe | 75 Mbps | 50 Mbps | Fiber |
| NJ — Riverdale | 100 Mbps | 50 Mbps | Fiber |
| MD — Woodlawn | 35 Mbps | 35 Mbps | Cable — ISP-limited |
| NC — Cherokee | 20 Mbps | 20 Mbps | Fixed wireless — ISP-limited |
| MA — Natick | 100 Mbps | 50 Mbps | Fiber |
| **Total concurrent** | — | **340 Mbps theoretical** | Staggered — never all at once |

> **Note:** Total theoretical exceeds 200Mbps ER4 cap, but sites are staggered and rarely all push simultaneously. ER4 QoS enforces the 200Mbps hard cap regardless.

### After Hours (8PM–6AM)

- ER4 QoS ceiling raised to 300 Mbps (full pipe)
- NAKIVO per-job throttle removed
- All sites can push at full ISP upload speed
- Stagger start times to avoid burst congestion

---

## Staggered Backup Schedule

Jobs are staggered to avoid all sites hammering HQ at once.

### Business Hours (6AM–8PM) — Incremental Jobs

| Start Time | Site | Bandwidth |
|-----------|------|-----------|
| 06:00 | CO — Denver | 50 Mbps |
| 06:30 | MA — Natick | 50 Mbps |
| 07:00 | NJ — Riverdale | 50 Mbps |
| 07:30 | NY — Albany | 35 Mbps |
| 08:00 | AZ — Tempe | 50 Mbps |
| 08:30 | NV — Las Vegas | 50 Mbps |
| 09:00 | MD — Woodlawn | 35 Mbps |
| 09:30 | NC — Cherokee | 20 Mbps |

> Most incremental jobs complete in 30–90 minutes. By staggering 30 min apart, peak concurrent is typically 2–3 sites.

### After Hours (8PM–6AM) — Full Speed Window

| Start Time | Site | Notes |
|-----------|------|-------|
| 20:00 | NC — Cherokee | Smallest pipe, start first |
| 20:15 | MD — Woodlawn | Cable, limited upload |
| 20:30 | NY — Albany | Cable, limited upload |
| 20:45 | NV — Las Vegas | Mid-tier |
| 21:00 | AZ — Tempe | |
| 21:15 | CO — Denver | |
| 21:30 | NJ — Riverdale | |
| 21:45 | MA — Natick | Largest remote site |

---

## NAKIVO Job Configuration

### Per-Job Settings

```
Job Type:              Incremental Backup
Target:                QNAP TVS-h1674X (\\<QNAP_IP>\backup_repo)
Encryption:            AES-256 in-flight (mandatory over public internet)
Compression:           Best (LZ4)
Changed Block Tracking: Enabled
App-Aware:             Enabled (VSS for Windows)
Retry on failure:      3 attempts, 5 min delay
Bandwidth Throttle:    Per schedule (see above)
```

### Retention Policy

```
Daily backups:         Keep 14
Weekly backups:        Keep 8 (Sunday)
Monthly backups:      Keep 6 (1st of month)
Yearly backups:        Keep 1 (Jan 1)
GFS rotation:          Enabled
Immutability:          7 days (ransomware protection)
```

### Alerting

```
Email on:              Job failure, Job warning, Repository >80% full
Email to:              it-alerts@kaychalabs.com (configure in NAKIVO → Settings → Email)
```

---

## NAKIVO Bandwidth Throttle Configuration

In NAKIVO Director (https://<HQ_IP>:4443):

1. **Settings → Bandwidth Throttling → Global Rules**

| Rule | Time Window | Max Rate | Priority |
|------|------------|----------|----------|
| Business Hours | Mon–Fri 06:00–20:00 | 200 Mbps (aggregate) | 1 |
| After Hours | Mon–Fri 20:00–06:00 | Unlimited | 2 |
| Weekends | Sat–Sun all day | Unlimited | 3 |

2. **Per-Job Throttle** (set in each backup job → Schedule → Bandwidth)

| Site Job | Business Hours Limit | After Hours |
|----------|---------------------|-------------|
| CO-Backup | 50 Mbps | Unlimited |
| NV-Backup | 50 Mbps | Unlimited |
| NY-Backup | 35 Mbps | Unlimited |
| AZ-Backup | 50 Mbps | Unlimited |
| NJ-Backup | 50 Mbps | Unlimited |
| MD-Backup | 35 Mbps | Unlimited |
| NC-Backup | 20 Mbps | Unlimited |
| MA-Backup | 50 Mbps | Unlimited |

3. **Repository Configuration**

```
Repository Name:       Kaycha-Primary
Repository Type:       CIFS/SMB Share on QNAP
Path:                  \\<QNAP_IP>\nakivo_backup
Deduplication:         Enabled (inline)
Encryption at Rest:    AES-256 (QNAP-side volume encryption)
```

---

## Monitoring Checklist

- [ ] ER4 QoS verified: `show traffic-policy` shows NAKIVO-SHAPER active
- [ ] Port 4443 forwarded: `show port-forward rules` confirms TCP 4443 → QNAP
- [ ] Task scheduler set: `show system task-scheduler` shows afterhours/businesshours scripts
- [ ] NAKIVO Director accessible: https://<HQ_IP>:4443 from LAN
- [ ] NAKIVO Director accessible: https://<WAN_IP>:4443 from remote sites
- [ ] Each site agent connects to Director successfully
- [ ] Test backup job runs from each site
- [ ] Bandwidth utilization stays within policy during business hours
- [ ] After-hours ceiling lift confirmed via traffic monitoring
- [ ] QNAP storage health: RAID 6 status, drive SMART checks
- [ ] Email alerts configured and tested
