# Test reminder expiry

Scheduled test reminders use the class end times in the supplied Fall 2026
timetable, in **America/Toronto** time. Only course, weekday, time and room data are
stored; the screenshot's student identifiers are not copied.

| Course | Sessions, local time |
| --- | --- |
| Electricity | Monday 09:00–10:59 and 15:00–17:29 |
| Structures | Tuesday 10:30–12:29 and 12:30–14:29; Saturday 15:00–15:59 |
| Safety | Wednesday 11:00–13:29 |
| Systems | Thursday 16:00–17:59; Friday 11:30–13:29 |
| Technical Publications | Friday 08:30–11:29 |
| Math | Wednesday 14:30–15:59; Thursday 14:00–15:29 |
| Aerodynamics | Wednesday 16:00–17:59; Friday 14:30–16:29 |
| Engines | Monday 11:00–12:59; Thursday 18:00–18:59 |

The screenshot is the September 8–December 18 timetable view. Automatic weekly
matching is limited to that period rather than assuming another term's hours.
When several sessions match the test date, expiry uses the final session.
A test can specify `endTime: "10:59"` to override that default for a particular
session. Unmatched weekdays, unknown courses or dates outside the supplied
period keep their reminders until Toronto midnight; no class time is invented.

At the displayed end minute, the reminder disappears from the date banner,
date dialog, course countdown and deadline-based course sorting. The homepage
refreshes on minute boundaries and on focus/visibility changes. This handles
daylight-saving time through Toronto's time zone, without fixed UTC offsets.
Practice questions, saved answers and highest scores remain available.

The old Safety completion label is suppressed on its course card. Its Module 1
completion remains visible inside the course/module; any next-date-pending
status still appears when appropriate. Explicit module completion flags are
separate from expiry of a scheduled reminder.

The test-date window lists each matching class time with its room. Monday
Electricity shows Room 208 in the morning and Room 206 in the afternoon;
Tuesday Structures shows Rooms 116 and 306. Saturday Structures is Online.
These are the scheduled classroom locations, not separately confirmed test rooms.
