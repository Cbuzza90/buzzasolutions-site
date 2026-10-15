# Phone chart practice workspace

Torque and resistor practice now use `ChartPracticeWorkspace`. On phones/tablets, the chart remains above a separately scrollable question/answer region. A blue control switches between more chart space and more answer space. Desktop keeps the chart beside the questions.

The chart image remains mounted while draft answers, grading, notes and questions update. This preserves its zoom and pan position (subject to normal browser scroll clamping when a viewport changes size). Starting the next question resets only the question pane's scroll position. Opening notes still uses a modal and does not replace the chart.

The visible viewport's resize event adjusts the workspace for mobile browser controls and keyboards. A compact presentation keeps zoom controls, the chart, answer fields and navigation accessible in short viewports. Focused fields are brought into the answer pane after the viewport resizes.

Both viewers support mouse dragging and touch panning/pinching. Resistor pinch uses the fitted container width with a 100–300% range; torque keeps its existing fit and zoom limits. Original chart assets, grading, progress keys and highest scores are unchanged. Chart viewers opened from standalone notes or module lists still use dialogs.

Verification includes pinch-anchor/limit tests and browser checks of phone/short-height/desktop layouts, independent answer scrolling, draft entry with unchanged chart offsets, feedback, notes closing and nested charts. A real mobile keyboard and multi-touch gesture still merit a physical-device check; desktop viewport testing does not emulate them fully.
