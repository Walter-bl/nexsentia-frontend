# NexSentia AI Chatbot - Response Formatting Guide

## Overview

This guide helps backend developers format AI chatbot responses in a human-readable way using **Markdown**. The frontend automatically renders markdown with beautiful styling.

---

## Supported Markdown Features

### 1. **Headings**

Use headings to organize responses into clear sections:

```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
```

**Example Response:**
```markdown
## Critical Weak Signals Summary

### High Priority Alerts
Here are the most critical signals requiring immediate attention...
```

---

### 2. **Lists (Bullet Points)**

Use bullet points for items, recommendations, or lists:

```markdown
- First item
- Second item
- Third item
  - Nested item
  - Another nested item
```

**Example Response:**
```markdown
Here are the top 3 critical weak signals:

- **Communication Breakdown** - Detected in Engineering team
  - Impact Score: 8.5/10
  - Affected: 15 team members

- **Deadline Pressure** - Sprint 2024-Q1
  - Impact Score: 7.2/10
  - Risk: Project delay

- **Resource Constraint** - DevOps capacity
  - Impact Score: 6.8/10
  - Status: Escalating
```

---

### 3. **Numbered Lists**

Use numbered lists for steps, rankings, or sequential information:

```markdown
1. First step
2. Second step
3. Third step
```

**Example Response:**
```markdown
## Top 5 Incidents This Week

1. **Database Performance Degradation** - Production
2. **API Timeout Issues** - Customer Portal
3. **Memory Leak** - Background Worker
4. **Authentication Failures** - Mobile App
5. **Cache Invalidation** - Web Dashboard
```

---

### 4. **Bold and Italic Text**

Emphasize important information:

```markdown
**Bold text** for important information
*Italic text* for emphasis
***Bold and italic*** for critical alerts
```

**Example Response:**
```markdown
**Alert:** Your organizational health score has **decreased by 12%** this week.

*Recommendation:* Schedule a team sync to address the *communication gaps*.
```

---

### 5. **Code Blocks**

Display code, JSON data, or structured information:

````markdown
```json
{
  "signalId": "SIG-2024-001",
  "severity": "high",
  "category": "communication"
}
```
````

**Example Response:**
````markdown
Here's the signal data in JSON format:

```json
{
  "id": "WS-2024-156",
  "title": "Team Morale Decline",
  "severity": "high",
  "detectedDate": "2024-02-11",
  "affectedTeams": ["Engineering", "Product"],
  "metrics": {
    "sentimentScore": 42,
    "engagementRate": "68%"
  }
}
```
````

---

### 6. **Inline Code**

Highlight specific terms, IDs, or short values:

```markdown
Use `code` for inline references
```

**Example Response:**
```markdown
Signal `WS-2024-156` was detected on 2024-02-11 and affects the `Engineering` team.
```

---

### 7. **Blockquotes**

Highlight important notes or quotes:

```markdown
> This is a blockquote
> It can span multiple lines
```

**Example Response:**
```markdown
> **Important:** This signal has been escalating for 3 consecutive weeks.
> Immediate attention is recommended to prevent further impact.
```

---

### 8. **Tables**

Display structured data in tables:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

**Example Response:**
```markdown
## Weekly Incident Summary

| Incident Type | Count | Avg Resolution Time | Status |
|--------------|-------|---------------------|--------|
| Critical | 3 | 2.5 hours | Resolved |
| High | 8 | 4.2 hours | In Progress |
| Medium | 15 | 8.1 hours | Resolved |
| Low | 22 | 24 hours | Monitoring |

**Total Incidents:** 48
```

---

### 9. **Links**

Add clickable links:

```markdown
[Link Text](https://example.com)
```

**Example Response:**
```markdown
For more details, view the [full incident report](https://nexsentia.com/incidents/2024-001).
```

---

### 10. **Horizontal Rules**

Separate sections visually:

```markdown
---
```

**Example Response:**
```markdown
## Current Signals

Here are the active signals...

---

## Historical Trends

Looking at the past 30 days...
```

---

## Complete Example Responses

### Example 1: Signal Summary

```markdown
## Critical Weak Signals Detected

I found **5 critical weak signals** that require your attention:

### 🔴 High Priority

1. **Communication Breakdown - Engineering Team**
   - Severity: `HIGH`
   - Detected: 2024-02-08
   - Impact Score: **8.5/10**
   - Affected: 15 team members

   > **Analysis:** Decrease in cross-team communication by 40% over the last 2 weeks.

2. **Deadline Pressure - Product Sprint**
   - Severity: `HIGH`
   - Detected: 2024-02-09
   - Impact Score: **7.8/10**
   - Risk: Project delay by 2-3 weeks

### 🟡 Medium Priority

3. **Resource Constraint - DevOps**
4. **Meeting Overload - Management**
5. **Documentation Gaps - Engineering**

---

### Recommendations

- **Immediate Action:** Schedule a sync meeting with Engineering team
- **Monitor:** Track communication metrics daily
- **Review:** Assess resource allocation for DevOps

[View Full Signal Dashboard](/dashboard/signals)
```

---

### Example 2: Organizational Health

```markdown
## Organizational Health Report

Your current health score is **72/100** (↓ 8 points from last week)

### Key Metrics

| Metric | Score | Change | Status |
|--------|-------|--------|--------|
| Strategic Alignment | 78 | ↓ -5% | 🟡 Warning |
| Communication Efficiency | 65 | ↓ -12% | 🔴 Critical |
| Team Morale | 71 | ↑ +3% | 🟢 Good |
| Project Velocity | 80 | → 0% | 🟢 Good |

### Insights

**Positive Trends:**
- Team morale is improving
- Project velocity remains strong
- Cross-functional collaboration increased by 15%

**Areas of Concern:**
- Communication efficiency dropped significantly
- 3 escalated incidents this week
- Resource utilization at 95% (overcapacity risk)

> **Recommendation:** Focus on improving communication channels and consider resource rebalancing.

---

### Next Steps

1. Address communication gaps immediately
2. Review resource allocation
3. Monitor escalation trends
4. Schedule team retrospective
```

---

### Example 3: Incident Analysis

```markdown
## Top Incidents - Last 7 Days

I analyzed **48 incidents** from the past week. Here's what I found:

### Critical Incidents

**1. Database Performance Degradation**
- **Status:** Resolved
- **Duration:** 2.5 hours
- **Impact:** 500+ users affected
- **Root Cause:** Index missing on high-traffic query

```sql
-- Missing index was added:
CREATE INDEX idx_user_activity ON user_logs(user_id, created_at);
```

**Resolution:** Database team added the missing index, performance restored to normal.

---

**2. API Timeout Issues**
- **Status:** In Progress
- **Duration:** 6+ hours (ongoing)
- **Impact:** Customer Portal degraded
- **Investigation:** Suspected network latency between microservices

> **Update:** Engineering team is currently investigating. ETA for resolution: 2 hours.

---

### Incident Breakdown

| Category | Count | Avg Resolution |
|----------|-------|----------------|
| Infrastructure | 12 | 3.2 hours |
| Application | 18 | 5.1 hours |
| Security | 3 | 1.8 hours |
| Network | 8 | 4.5 hours |
| Other | 7 | 6.2 hours |

### Patterns Detected

The AI detected these patterns:

- 🔍 **Spike in API timeouts** - Started after last deployment
- 🔍 **Database queries 30% slower** - Needs optimization
- 🔍 **3x increase in authentication errors** - Investigate token service

**Suggested Actions:**
1. Rollback last deployment if issues persist
2. Audit slow database queries
3. Check authentication service health
```

---

## Best Practices

### ✅ DO

1. **Use clear headings** to organize information
2. **Highlight important data** with bold or code formatting
3. **Use tables** for structured data comparison
4. **Add context** with blockquotes for important notes
5. **Keep it concise** but informative
6. **Use emojis sparingly** for visual indicators (🔴🟡🟢)
7. **Format numbers** clearly (use commas, percentages, decimals)
8. **Provide actionable insights** not just data dumps

### ❌ DON'T

1. **Don't dump raw JSON** without context - format it nicely
2. **Don't overuse bold/italic** - use for emphasis only
3. **Don't create huge walls of text** - break into sections
4. **Don't forget whitespace** - use line breaks for readability
5. **Don't use HTML** - stick to markdown
6. **Don't skip summaries** - always provide a TL;DR for long responses

---

## Response Templates

### Template 1: Query Response with Data

```markdown
## [Title of Response]

[Brief 1-2 sentence summary]

### Key Findings

- **Finding 1:** [description]
- **Finding 2:** [description]
- **Finding 3:** [description]

### Detailed Analysis

[Detailed information with tables/lists if needed]

---

### Recommendations

1. [Action item 1]
2. [Action item 2]
3. [Action item 3]
```

### Template 2: Error/No Data Response

```markdown
## No [Data Type] Found

I couldn't find any [data type] matching your criteria.

**Possible reasons:**
- No data exists for this time period
- Filters may be too restrictive
- Data may not be synced yet

**Try this instead:**
- Adjust date range
- Remove some filters
- Check if data source is connected
```

### Template 3: Confirmation Response

```markdown
## ✓ Request Completed

I've successfully [completed action].

**Details:**
- [Detail 1]
- [Detail 2]

[View results](/link-to-results)
```

---

## Implementation Tips

### Backend: OpenAI Prompt Engineering

Structure your OpenAI prompt to return markdown:

```javascript
const systemPrompt = `
You are NexSentia AI Assistant. When responding:
1. Use markdown formatting for readability
2. Structure responses with clear headings
3. Use tables for data comparisons
4. Use bullet points for lists
5. Use code blocks for technical data (JSON, SQL, etc.)
6. Keep responses concise but informative
7. Always provide actionable insights
8. Use bold for emphasis on key metrics

Example format:
## [Title]
Brief summary...

### Key Points
- Point 1
- Point 2

[Additional details with tables/lists/code blocks]
`;

const userPrompt = `
Show me critical weak signals.

Data available: ${JSON.stringify(signalData)}
`;
```

### Backend: Response Post-Processing

Optionally, post-process OpenAI responses to ensure quality:

```javascript
function formatChatbotResponse(aiResponse) {
  // Ensure proper markdown spacing
  let formatted = aiResponse.trim();

  // Add spacing after headings
  formatted = formatted.replace(/^(#{1,3} .+)$/gm, '$1\n');

  // Add spacing around lists
  formatted = formatted.replace(/(\n- .+)(\n[^-\n])/g, '$1\n$2');

  // Ensure code blocks are properly formatted
  formatted = formatted.replace(/```(\w+)?\n/g, '\n```$1\n');

  return formatted;
}
```

---

## Testing Your Responses

### Quick Test Prompts

1. "Show me critical weak signals" - Should return structured list
2. "What's our organizational health?" - Should return metrics/table
3. "Top incidents this week" - Should return numbered list with details
4. "Summarize team performance" - Should return insights with recommendations

### Checklist

- [ ] Response has clear heading
- [ ] Key information is highlighted (bold/code)
- [ ] Data is formatted in tables when appropriate
- [ ] Lists are used for multiple items
- [ ] Important notes use blockquotes
- [ ] Code/JSON uses code blocks
- [ ] Response is actionable (includes recommendations)
- [ ] Proper spacing and line breaks
- [ ] Links work correctly
- [ ] Emojis used sparingly for visual cues

---

## Frontend Styling

The frontend automatically styles:
- **Headings** → Bold, colored, sized appropriately
- **Lists** → Green dots, proper spacing
- **Code blocks** → Dark background, syntax highlighting
- **Tables** → Bordered, styled rows
- **Blockquotes** → Left border, highlighted background
- **Links** → Green, underlined, hover effects

---

**Ready to create beautiful, readable AI responses! 🚀**
