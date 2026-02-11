# NexSentia Chatbot - Backend Quick Reference

## SSE Response Format (One Page)

### 1. Headers
```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

---

### 2. Event Sequence

```javascript
// Event 1: METADATA (send first)
data: {"type":"metadata","sessionId":"uuid-here","sources":{"signals":10,"incidents":5}}

// Event 2-N: TOKENS (send as generated)
data: {"type":"token","content":"## "}

data: {"type":"token","content":"Critical "}

data: {"type":"token","content":"Signals\n\n"}

// Last Event: DONE
data: {"type":"done"}

```

---

### 3. Token Content (Markdown)

```markdown
## Main Heading
### Subheading

**Bold text** for emphasis
*Italic text* for notes

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Next item

| Column 1 | Column 2 |
|----------|----------|
| Data | Data |

```code
Technical data here
```

> **Important:** Blockquote for recommendations

[Link text](url)
```

---

### 4. Response Templates

**Signal Summary:**
```markdown
## Critical Weak Signals

I found **{count} signals** requiring attention:

1. **{Title}** - {Department}
   - **Severity:** `{HIGH/MEDIUM/LOW}`
   - **Impact:** {score}/10

   > **Analysis:** {brief description}

### Recommendations
- **Immediate:** {action}
- **Monitor:** {tracking}
```

**Health Report:**
```markdown
## Health Report

Score: **{score}/100** (↓ {change} points)

| Metric | Score | Status |
|--------|-------|--------|
| Alignment | 78 | 🟡 |
| Morale | 71 | 🟢 |

> **Recommendation:** {action}
```

**Incident Report:**
```markdown
## Top Incidents

**1. {Title}**
- **Status:** ✅ Resolved
- **Duration:** {time}
- **Impact:** {users} affected

### Statistics
| Category | Count |
|----------|-------|
| Infrastructure | 5 |
```

---

### 5. Code Example (Node.js)

```javascript
app.post('/chatbot/chat-stream', async (req, res) => {
  const { message, sessionId } = req.body;

  // Set headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // 1. Send metadata
  res.write(`data: ${JSON.stringify({
    type: 'metadata',
    sessionId: sessionId || generateUUID(),
    sources: { signals: 10, incidents: 5 }
  })}\n\n`);

  // 2. Stream from OpenAI
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ],
    stream: true
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      res.write(`data: ${JSON.stringify({
        type: 'token',
        content: content
      })}\n\n`);
    }
  }

  // 3. Send done
  res.write(`data: ${JSON.stringify({type:'done'})}\n\n`);
  res.end();
});
```

---

### 6. OpenAI System Prompt

```javascript
const SYSTEM_PROMPT = `You are NexSentia AI Assistant.

FORMAT RULES:
- Use ## for headings
- Use **bold** for emphasis
- Use tables for metrics
- Use lists for items
- Use code blocks for technical data
- Use > for recommendations
- Emojis: 🔴 critical, 🟡 warning, 🟢 good

STRUCTURE:
1. Heading with summary
2. Details with data
3. Recommendations

AVAILABLE DATA:
{include context here}
`;
```

---

### 7. Testing

**Test queries:**
1. "Show me critical weak signals"
2. "What's our health score?"
3. "Top incidents this week"

**Verify:**
- [ ] Metadata sent first
- [ ] Tokens stream in real-time
- [ ] Done event sent last
- [ ] Markdown renders correctly
- [ ] Tables display properly

---

### 8. Common Issues

| Issue | Solution |
|-------|----------|
| Tokens not streaming | Don't buffer, send immediately |
| Markdown not rendering | Check newlines (`\n`) in tokens |
| Tables broken | Verify proper markdown table syntax |
| No cursor animation | Ensure tokens sent one at a time |

---

### 9. Emojis & Symbols

```
Status: ✅ ❌ 🟢 🟡 🔴
Trends: ↑ ↓ →
Actions: 🔍 📊 ⚠️ 💡
```

---

### 10. Event Format Reference

```typescript
// Metadata Event
{
  type: "metadata",
  sessionId: string,      // UUID
  sources: {
    signals?: number,
    incidents?: number,
    issues?: number,
    metrics?: number
  }
}

// Token Event
{
  type: "token",
  content: string         // Word/token with markdown
}

// Done Event
{
  type: "done"
}

// Error Event
{
  type: "error",
  message: string
}
```

---

## That's It!

Three event types + markdown content = working chatbot 🚀

**Full documentation:** See BACKEND_API_SPECIFICATION.md
