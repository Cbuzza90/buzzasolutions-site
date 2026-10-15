# Phone chart practice workspace

Torque and resistor practice now use `ChartPracticeWorkspace`. On phones/tablets, the chart remains above a separately scrollable question/answer region. A blue control switches between more chart space and more answer space. Desktop keeps the chart beside the questions.

The chart image remains mounted while draft answers, grading, notes and questions update. This preserves its zoom and pan position (subject to normal browser scroll clamping when a viewport changes size). Starting the next question resets only the question pane's scroll position. Opening notes still uses a modal and does not replace the chart.

The visible viewport's resize event adjusts the workspace for mobile browser controls and keyboards. A compact presentation keeps zoom controls, the chart, answer fields and navigation accessible in short viewports. Focused fields are brought into the answer pane after the viewport resizes.

Both viewers support mouse dragging and touch panning/pinching. Resistor pinch uses the fitted container width with a 100–300% range; torque keeps its existing fit and zoom limits. Original chart assets, grading, progress keys and highest scores are unchanged. Chart viewers opened from standalone notes or module lists still use dialogs.

Verification includes pinch-anchor/limit tests and browser checks of phone/short-height/desktop layouts, independent answer scrolling, draft entry with unchanged chart offsets, feedback, notes closing and nested charts. A real mobile keyboard and multi-touch gesture still merit a physical-device check; desktop viewport testing does not emulate them fully.

Torque phone practice follows the chart-first reference layout: zoom controls, chart, then current diameter/bolt/nut and chart row. Compact neutral answers sit below, with a short torque prompt. Question details, highest score and searchable notes expand from a blue button. The default reserves space for four 44px answer targets on a typical portrait phone; smaller/landscape viewports retain answer-pane scrolling and the chart-size toggle. Desktop and resistor layouts retain their existing presentation.

The compact torque toolbar combines progress, Details / notes, and the chart/answer size toggle in one row. The row designation is plain single-line text; zoom controls are 28px high and the bottom navigation uses horizontal icon/label buttons. Answer targets remain 44px high.

The user subsequently removed both Details / notes and More answers controls from torque phone/tablet practice. That view now keeps a fixed chart/answer split and compact progress text; module notes remain accessible via Tests without losing progress. Desktop retains its full question and notes presentation. Resistor controls are unchanged.
