# Example AI Chatbot Responses

These examples demonstrate how the chatbot renders different types of markdown responses.

---

## Example 1: Simple Text Response

### User Query:
```
"Hello, what can you help me with?"
```

### AI Response (Markdown):
```markdown
Hi! I'm NexSentia AI Assistant. I can help you with:

- **Weak Signals Analysis** - Identify emerging patterns and trends
- **Incident Management** - Track and analyze incidents
- **Organizational Health** - Monitor team performance and metrics
- **Issue Tracking** - Review open and resolved issues
- **Recommendations** - Get actionable insights

Just ask me anything about your organizational data!
```

### Rendered Output:
> Hi! I'm NexSentia AI Assistant. I can help you with:
>
> - **Weak Signals Analysis** - Identify emerging patterns and trends
> - **Incident Management** - Track and analyze incidents
> - **Organizational Health** - Monitor team performance and metrics
> - **Issue Tracking** - Review open and resolved issues
> - **Recommendations** - Get actionable insights
>
> Just ask me anything about your organizational data!

---

## Example 2: Signal Summary with Data

### User Query:
```
"Show me critical weak signals"
```

### AI Response (Markdown):
```markdown
## Critical Weak Signals Detected

I found **5 critical weak signals** that require immediate attention:

### 🔴 High Priority

**1. Communication Breakdown - Engineering Team**
- **Severity:** `HIGH`
- **Impact Score:** 8.5/10
- **Detected:** 2024-02-08
- **Affected:** 15 team members
- **Trend:** ↓ 40% decrease in cross-team communication

> **Recommendation:** Schedule an emergency team sync to address communication gaps.

**2. Deadline Pressure - Product Sprint Q1 2024**
- **Severity:** `HIGH`
- **Impact Score:** 7.8/10
- **Risk:** Project delay by 2-3 weeks
- **Contributing Factors:** Resource constraints, scope creep

**3. Resource Constraint - DevOps Team**
- **Severity:** `MEDIUM`
- **Impact Score:** 6.8/10
- **Status:** Escalating for 2 weeks

---

### Signal Trend Analysis

| Week | Critical | High | Medium | Total |
|------|----------|------|--------|-------|
| Week 1 | 2 | 5 | 8 | 15 |
| Week 2 | 3 | 6 | 10 | 19 |
| Week 3 | 4 | 8 | 12 | 24 |
| **Week 4** | **5** | **9** | **14** | **28** |

📈 **Trend:** Signals increasing by 40% over the past month.

---

### Next Steps

1. **Immediate:** Address top 2 high-priority signals
2. **This Week:** Conduct team health check
3. **Monitor:** Track signal progression daily
4. **Review:** Re-assess in 1 week

[View Detailed Signal Dashboard →](/dashboard/signals)
```

---

## Example 3: Organizational Health Report

### User Query:
```
"What's our organizational health score?"
```

### AI Response (Markdown):
```markdown
## Organizational Health Report

Your current health score is **72/100** (↓ 8 points from last week)

### Key Performance Indicators

| Metric | Current | Previous | Change | Status |
|--------|---------|----------|--------|--------|
| Strategic Alignment | 78 | 83 | ↓ -5% | 🟡 Warning |
| Communication Efficiency | 65 | 77 | ↓ -12% | 🔴 Critical |
| Team Morale | 71 | 68 | ↑ +3% | 🟢 Good |
| Project Velocity | 80 | 80 | → 0% | 🟢 Good |
| Innovation Index | 75 | 72 | ↑ +3% | 🟢 Good |

---

### Insights

#### ✅ Positive Trends
- Team morale improving despite challenges
- Project velocity remains stable
- Innovation metrics trending upward
- Cross-functional collaboration increased 15%

#### ⚠️ Areas of Concern
- **Communication efficiency dropped significantly** (12% decrease)
- 3 escalated incidents this week vs 1 last week
- Resource utilization at **95%** (overcapacity risk)
- Meeting overhead increased by 20%

> **Critical Alert:** Communication efficiency is at the lowest point in 3 months. This requires immediate attention.

---

### Department Breakdown

**Engineering:**
- Health Score: 68/100 (↓ -12)
- Top Issue: High workload, communication gaps
- Recommendation: Reduce meeting overhead, improve async communication

**Product:**
- Health Score: 75/100 (→ 0)
- Status: Stable
- Note: Maintaining good velocity

**Design:**
- Health Score: 80/100 (↑ +5)
- Status: Improving
- Note: New collaboration tools showing positive impact

---

### Recommended Actions

1. **Priority 1:** Address communication breakdown in Engineering
   - Schedule team retrospective
   - Review communication channels
   - Implement daily standups

2. **Priority 2:** Manage resource capacity
   - Review project priorities
   - Consider temporary resource augmentation
   - Assess workload distribution

3. **Priority 3:** Monitor escalations
   - Investigate root causes
   - Implement preventive measures
   - Track resolution times

**Next Review:** 2024-02-18 (1 week)
```

---

## Example 4: Incident Analysis with Code

### User Query:
```
"What are the top incidents this week?"
```

### AI Response (Markdown):
```markdown
## Top Incidents - Last 7 Days

I analyzed **48 incidents** from February 5-11, 2024. Here's the breakdown:

---

### 🔴 Critical Incidents (3)

#### 1. Database Performance Degradation
- **Status:** ✅ Resolved
- **Duration:** 2 hours 32 minutes
- **Impact:** 500+ users affected
- **Root Cause:** Missing database index
- **Resolution Time:** Within SLA (3 hours)

**Technical Details:**

```sql
-- Problem: Slow query on user_logs table
SELECT * FROM user_logs
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT 100;

-- Solution: Added composite index
CREATE INDEX idx_user_activity
ON user_logs(user_id, created_at);

-- Result: Query time reduced from 2.5s to 45ms (98% improvement)
```

**Preventive Measures:**
- Implement query performance monitoring
- Review indexing strategy quarterly
- Add automated alerts for slow queries > 1s

---

#### 2. API Gateway Timeout Issues
- **Status:** 🟡 In Progress
- **Duration:** 6+ hours (ongoing)
- **Impact:** Customer Portal degraded performance
- **Investigation:** Network latency between microservices

**Current Status:**

```json
{
  "incident_id": "INC-2024-0142",
  "severity": "high",
  "affected_services": ["customer-api", "auth-service"],
  "estimated_users_affected": 1200,
  "eta_resolution": "2024-02-11T16:00:00Z",
  "assigned_team": "Infrastructure"
}
```

> **Update:** Engineering team deployed a hotfix. Monitoring for 30 minutes before marking resolved.

---

#### 3. Authentication Service Outage
- **Status:** ✅ Resolved
- **Duration:** 45 minutes
- **Impact:** Login failures across all platforms
- **Root Cause:** Redis cache failure
- **Lessons Learned:** Need better cache fallback

---

### 📊 Incident Statistics

| Category | Count | Avg Resolution | MTTR | Status |
|----------|-------|----------------|------|--------|
| Infrastructure | 12 | 3.2 hours | 2.8h | ✅ |
| Application | 18 | 5.1 hours | 4.5h | 🟡 |
| Security | 3 | 1.8 hours | 1.2h | ✅ |
| Network | 8 | 4.5 hours | 4.0h | ✅ |
| Database | 7 | 6.2 hours | 5.5h | 🟡 |

**Overall MTTR:** 4.2 hours (Target: 4 hours) - Slightly above target

---

### 🔍 Patterns Detected by AI

The system identified these recurring patterns:

1. **API Timeouts Spike Post-Deployment**
   - Correlation: 80% of timeouts occur within 2 hours of deployment
   - Recommendation: Implement canary deployments

2. **Database Performance Degradation on Fridays**
   - Pattern: Slow queries 3x more common on Fridays 2-4 PM
   - Hypothesis: Weekly report generation impacting performance
   - Action: Move batch jobs to off-peak hours

3. **Authentication Errors Increase During Peak Hours**
   - Pattern: 3x increase in auth errors 9-11 AM, 2-4 PM
   - Root Cause: Token service not scaling properly
   - Recommendation: Implement auto-scaling for auth service

---

### Incident Velocity Trend

```
Week 1: ████████░░ 32 incidents
Week 2: ██████████ 40 incidents (+25%)
Week 3: ████████░░ 35 incidents (-12%)
Week 4: ████████████ 48 incidents (+37%) ⚠️
```

**Analysis:** Incident rate increased 50% over the past month. This trend requires investigation.

---

### Recommendations

**Immediate Actions:**
1. Deploy hotfix for API timeout issues
2. Implement auto-scaling for authentication service
3. Schedule post-mortem for critical incidents

**Short-term (This Week):**
1. Review and optimize database queries
2. Implement canary deployment strategy
3. Increase monitoring coverage

**Long-term (This Month):**
1. Conduct infrastructure capacity planning
2. Implement chaos engineering tests
3. Enhance incident response playbooks

**Next Review:** Tomorrow, 2024-02-12 at 10:00 AM
```

---

## Example 5: Error Response

### User Query:
```
"Show me signals from 2019"
```

### AI Response (Markdown):
```markdown
## No Data Found

I couldn't find any weak signals from 2019.

**Possible reasons:**

- Data retention policy may have archived/deleted 2019 data
- NexSentia system was not in use during 2019
- Access permissions may restrict historical data

---

### What you can do instead:

**Try a different date range:**
- View data from the past 30 days
- Analyze quarterly trends (last 3 months)
- Review year-over-year comparisons (2024 vs 2023)

**Example queries:**
- "Show me signals from last month"
- "What are the current active signals?"
- "Compare Q1 2024 with Q1 2023"

Need help? Just ask!
```

---

## Example 6: Confirmation/Action Response

### User Query:
```
"Mark signal WS-2024-156 as resolved"
```

### AI Response (Markdown):
```markdown
## ✅ Signal Marked as Resolved

Successfully marked signal **WS-2024-156** as resolved.

### Updated Signal Details

| Field | Value |
|-------|-------|
| Signal ID | WS-2024-156 |
| Title | Team Morale Decline - Engineering |
| Previous Status | Active |
| **New Status** | **Resolved** |
| Resolved By | John Doe |
| Resolution Date | 2024-02-11 14:32 |

---

### Resolution Notes

> Signal was addressed through team retrospective and action plan implementation. Follow-up scheduled for 2 weeks.

### Impact

- **Sentiment Score:** Improved from 42 → 68 (+26 points)
- **Engagement Rate:** Increased from 68% → 82%
- **Team Satisfaction:** Up 15% since intervention

---

### Related Actions

Would you like to:
- View all resolved signals this month
- Generate a resolution report
- Schedule follow-up review

[View Signal History →](/signals/WS-2024-156/history)
```

---

## Formatting Tips for Backend

### Use These Patterns:

✅ **Headers for sections**
```markdown
## Main Section
### Subsection
```

✅ **Tables for comparisons**
```markdown
| Metric | Value | Status |
|--------|-------|--------|
| Score | 72 | 🟢 Good |
```

✅ **Code blocks for technical data**
```markdown
```json
{"key": "value"}
```
```

✅ **Blockquotes for important notes**
```markdown
> **Important:** This requires immediate attention.
```

✅ **Lists for multiple items**
```markdown
- Item 1
- Item 2
- Item 3
```

✅ **Bold for emphasis**
```markdown
**Important text**
```

✅ **Inline code for IDs/values**
```markdown
Signal `WS-2024-156` was detected
```

---

## Testing Your Responses

Copy any of these markdown examples and send them through your chatbot endpoint to see how they render in the UI. Adjust formatting based on what looks best!
