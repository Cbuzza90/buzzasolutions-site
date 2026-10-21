# Structures Module 2: full review source audit

## Source retrieval and scope

Read the Structures project's chat titled Module 2 Info Addition (conversation 6ad8d983-43e8-83e9-a38a-fff55ad0dbbc) on 2026-10-21 using the app's read-only chat tools. No prompts were sent to that chat. Five original decks were exposed as readable temporary attachments, copied into ignored tmp/structures-module2-source for inspection:

- 3) Measuring Tools-2(1).pptx: 74 slides.
- 4) Safety Methods and Aircraft Cable [Autosaved]-1.pptx: 63 slides.
- 5) Hardware - Bolts and Threaded Fasteners [Autosaved]-1.ppt: 61 slides.
- 6) Hardware - Nuts and Washers-2.ppt: 39 slides.
- 7) Hardware - Screws, Pins, Turn Lock Fasteners-2.ppt: 31 slides.

The three legacy PPT decks were read from their compound-file PowerPoint Document stream. Current slide order was resolved through the UserEdit/PersistPtr directory and SlideListWithText, avoiding duplicated legacy speaker-note text as the primary slide source. PPTX text and images were read from OOXML. Binary decks contain additional legacy notes that conflict with main slides in places; discrepancies are flagged below rather than silently used as keys.

The chat includes pasted measuring-tool and 15 safety/cable quiz prompts. Those have no marked answer key in the retrieved text, so slide material supplies the answers. The chat reader omits image content from turn text and exposes only five recent quiz-image previews; these five were visually inspected. They show straight/spiral turnbuckle identification, witness wire and the three-step Nicopress match. Earlier quiz images not exposed by the reader were not claimed as visually checked. Their source concepts are covered where verified in the decks. The original Measuring Tools bank remains sourced to the prior deck/review audit.

## Delivered behavior

/study/structures/module-2/practice-2 is Module 2 Full Review. A 224-question pool samples 40 distinct questions per attempt, eight from each of the five presentation topics. All material remains searchable in exact Module 2 notes, even when not sampled. A reset reshuffles the pool and keeps the highest completed score. Stored progress uses /study/structures/module-2/practice-2:40, independently of old measuring/torque attempts. Both existing tests remain active.

The shared multiple-choice engine handles answer shuffling, grading, notes closing, diagrams and results. Original source images are copied at native resolution, not screenshot thumbnails. Four identification questions use crops of the source turnbuckle comparison with the printed names outside the quiz crop; the full labelled image is available in the notes. Reused measuring question references are displayed once rather than twice in notes search.

## Source cautions and exclusions

The searchable Source qualifications & limits section flags: AS/AMS naming; EASA/JAA title/history wording; AN/NAS naming inconsistencies; the clevis-bolt/pin family mix-up; the AN multi-digit length shortcut; a NAS104/NAS1104 typo; the extra zero in the MS20002 washer number; incompatible NAS679 temperature statements; questionable use of hand resistance as a reuse criterion; repeated MS35265 mappings; inconsistent 82/83-degree screw text and conflicting MS24693 descriptions. These exact uncertain claims are not turned into answer keys.

Witness marks are treated as movement references, not direct torque measurements. The slide's three-fastener wiring limit is explicitly scoped to the course arrangement. Thread-locker and torque-wrench statements retain applicable-procedure qualifications. Current publisher/regulator corrections were not independently verified in this pass: web searches returned no results, and attempted primary pages were unavailable or unreadable. Unverified expansions are withheld. The old five-class fit chart is identified as course historical context rather than a universal current Unified A/B standard.

Numerical conversion, extension-torque and measurement-arithmetic exercises remain excluded under AGENTS.md's non-Math rule. Direct scale facts, code meanings and explicitly provided size examples remain. The supplied cotter-pin examples are recognized directly without generated arithmetic.

## Pasted safety quiz coverage

AN380-2-6 diameter; turnbuckle definition; left-thread groove; 0.032/0.041/0.020 wire rates; double-twisted method; course three-fastener limit; swage-terminal purpose; avoiding tension readings too close to a turnbuckle; safetying definition; AN380-1-4 length; circlip pliers; replacement of distorted turnbuckles; three exposed threads; four wire-pattern identifications; and all three Nicopress steps are represented in questions and notes.

## Source fingerprints

These hashes identify the inspected copies; full decks, extracted texts and chat screenshots remain ignored temporary files.

| Working copy | SHA-256 |
| --- | --- |
| measuring.pptx | de280d40d41e913357e83b90613ea7b76fb7177ef792d3a83c6305cfa718c4ab |
| safety-cables.pptx | 0ce53de226fc2ae0855247dd2e5fb8cf9e001bb4132bde2fd61a8ba49d2b82d4 |
| bolts.ppt | 409bad525e6d9b319576074a809d6341b78d3a2334e40b36de9abc48262aa8c6 |
| nuts.ppt | b347ae283ecd404a2d37d8270b29053d20f9121b1b737b4b2be36e4da5a90370 |
| screws-pins.ppt | e6c84ee575508fe25f53a4edb41daa96bda4b1ad375e7a03ffdf3ca5015d4c80 |

## Question mapping

| Learning target | Deck | Slide(s) | Correct answer |
| --- | --- | --- | --- |
| trammel | measuring | 21 | Trammeling tool |
| square | measuring | 12, 13 | Machinist square |
| dial-caliper | measuring | 52, 54, 55 | Dial caliper |
| outside-micrometer | measuring | 41, 42 | Outside micrometer |
| pyrometer | measuring | 70, 71 | Pyrometer |
| depth-micrometer | measuring | 62 | Depth micrometer |
| radius-gauge | measuring | 23 | Radius gauge |
| feeler-gauge | measuring | 22 | Feeler gauge |
| layout-tools | measuring | 5 | Layout tools |
| steel-scale-units | measuring | 6, 7 | Imperial inches and metric millimetres |
| tape-measure | measuring | 10 | Tape measure |
| divider | measuring | 17, 20 | Divider |
| compass | measuring | 20 | Compass |
| inside-caliper | measuring | 17 | Inside caliper |
| outside-caliper | measuring | 17 | Outside caliper |
| trammel-purpose | measuring | 21 | Compare dimensions at positions that should match |
| feeler-purpose | measuring | 22 | Feeler or thickness gauge |
| torque-definition | measuring | 24 | A turning effect that tends to produce rotation |
| drag-torque | measuring | 25 | Torque needed to overcome internal locking friction before seating |
| drag-relationship | measuring | 25 | It is added to the desired torque |
| newton-metres | measuring | 24, 40 | Newton metres |
| under-torque | measuring | 26 | Movement or vibration of the components |
| over-torque | measuring | 26 | Excessive stress on threads and components |
| beam-wrench | measuring | 27, 28 | Deflecting beam |
| dial-wrench | measuring | 29 | Torsion-bar dial-gauge wrench |
| click-wrench | measuring | 30 | A snap that can be heard and felt |
| digital-wrench | measuring | 31 | Strain gauge attached to a torsion rod |
| calibration-check | measuring | 32 | Its calibration date |
| handle-extension | measuring | 32, 35, 36 | Do not add a handle extension |
| wrench-motion | measuring | 32 | With a slow, even motion |
| anvil | measuring | 42 | Anvil |
| spindle | measuring | 42, 43 | Spindle |
| frame | measuring | 42 | Frame |
| sleeve | measuring | 41, 42, 44 | Sleeve |
| thimble | measuring | 41, 42 | Thimble |
| lock-nut | measuring | 42 | Lock nut |
| ratchet-stop | measuring | 42, 43 | Ratchet stop |
| measuring-faces | measuring | 42, 43 | Anvil and spindle measuring faces |
| light-contact | measuring | 43 | With light contact |
| zero-check | measuring | 43 | Anvil and spindle |
| micrometer-care | measuring | 43 | Check calibration and lightly oil spindle threads |
| caliper-measurements | measuring | 52, 55 | Inside, outside and depth |
| digital-zero | measuring | 53 | Close the jaws and press the zero button |
| dial-zero | measuring | 54 | Close the jaws, loosen the knob, align zero and retighten |
| gentle-jaws | measuring | 52 | Gently, using the applicable measuring jaws |
| depth-zero | measuring | 62 | When the spindle is even with the face bar |
| dent-depth | measuring | 63 | Dial or digital depth gauge |
| inside-micrometer | measuring | 64, 65 | Internal dimensions |
| gauge-blocks | measuring | 66 | Precision lengths using blocks of known thickness |
| dial-indicator | measuring | 67, 68 | Dial indicator |
| indicator-base | measuring | 67 | To prevent movement of the indicator's support |
| pressure-gauges | measuring | 69 | Fluid or gas pressure, including vacuum where the gauge is designed for it |
| temperature-contact | measuring | 70, 71 | Pyrometer |
| weigh-scales | measuring | 72 | Measuring resin quantities |
| safetying | safety-cables | 5 | Safetying |
| double-twisted | safety-cables | 7 | Double-twisted method |
| single-wire | safety-cables | 7, 11 | Single-wire method |
| witness-wire | safety-cables | 35, 45 | Witness wire |
| tab-washer | safety-cables | 47 | Tab washer |
| peening | safety-cables | 48 | Peening |
| staking | safety-cables | 48 | Staking |
| circlip | safety-cables | 50, 51 | Circlip / snap ring |
| internal-circlip | safety-cables | 50 | Internal circlip |
| external-circlip | safety-cables | 50 | External circlip |
| wire-032 | safety-cables | 12 | 6–8 |
| wire-041 | safety-cables | 13 | 5–7 |
| wire-020 | safety-cables | 13 | 8–10 |
| wire-fastener-limit | safety-cables | 9 | 3 fasteners |
| wire-direction | safety-cables | 7, 14 | By pulling in the tightening direction |
| wire-tension | safety-cables | 13 | Maintaining tension on the wire |
| wire-clearance | safety-cables | 10 | That no moving component can rub against the wire |
| circlip-tool | safety-cables | 51 | Circlip pliers |
| anaerobic-locker | safety-cables | 49 | Absence of air in the joint |
| turnbuckle | safety-cables | 16, 17 | Turnbuckle |
| turnbuckle-barrel | safety-cables | 16, 17 | Turnbuckle barrel |
| turnbuckle-lock-clip | safety-cables | 37 | Turnbuckle lock clip |
| tensiometer | safety-cables | 40 | Tensiometer |
| swage-terminal | safety-cables | 55, 56, 57, 58 | Swage terminal |
| nicopress | safety-cables | 59, 60, 61, 62 | Nicopress sleeve |
| turnbuckle-groove | safety-cables | 16, 17 | A groove |
| turnbuckle-exposed | safety-cables | 19, 25 | 3 |
| turnbuckle-equal | safety-cables | 19 | By equal distances |
| turnbuckle-damage | safety-cables | 21 | Replace it |
| turnbuckle-method | safety-cables | 22 | The applicable maintenance manual |
| turnbuckle-wrap-turns | safety-cables | 24, 28, 33, 34 | 4 turns |
| double-wrap-wires | safety-cables | 29, 30, 31 | 2 |
| cable-reading-location | safety-cables | 40 | Do not take it too close to the turnbuckle |
| nicopress-first-step | safety-cables | 60 | Loop the cable around a bushing or thimble and return it through the sleeve |
| nicopress-check | safety-cables | 61, 62 | A go/no-go gauge |
| cable-7-19 | safety-cables | 53 | 7 × 19 extra-flexible |
| cable-7-7 | safety-cables | 53 | 7 × 7 flexible |
| cable-1-19 | safety-cables | 54 | Non-flexible cable |
| cable-1-7 | safety-cables | 54 | Non-flexible cable |
| cable-material | safety-cables | 53, 54 | Stainless steel and galvanized carbon steel |
| cotter-diameter-example | safety-cables | 42 | 2/32 inch (1/16 inch) |
| cotter-length-example | safety-cables | 41, 42 | 1 inch |
| single-straight-picture | safety-cables | 24, 25 | Single wrap straight |
| double-straight-picture | safety-cables | 29, 30 | Double wrap straight |
| single-spiral-picture | safety-cables | 26, 27, 28 | Single wrap spiral |
| double-spiral-picture | safety-cables | 31, 32, 33, 34 | Double wrap spiral |
| nicopress-crimps | safety-cables | 60, 61, 62 | Make three crimps in the illustrated sequence |
| standard-an | bolts | 6 | Army Navy |
| standard-ms | bolts | 6 | Military Standard |
| standard-nas | bolts | 6, 49 | National Aerospace Standard |
| standard-and | bolts | 7 | Air Force-Navy Design |
| standard-asa | bolts | 7 | American Standards Association |
| standard-naf | bolts | 7 | Naval Aircraft Factory |
| standard-sae | bolts | 7, 9 | Society of Automotive Engineers |
| standard-astm | bolts | 8 | American Society for Testing and Materials |
| standard-ansi | bolts | 8 | American National Standards Institute |
| standard-aisi | bolts | 9 | American Iron and Steel Institute |
| standard-cgsb | bolts | 10 | Canadian General Standards Board |
| standard-mil | bolts | 11 | Military specifications or standards |
| standard-tc | bolts | 12 | Transport Canada |
| standard-faa | bolts | 13 | Federal Aviation Administration |
| thread-pitch | bolts | 24 | Pitch |
| thread-crest | bolts | 25 | Crest |
| thread-root | bolts | 26 | Root |
| major-diameter | bolts | 27 | Major diameter |
| minor-diameter | bolts | 27 | Minor diameter |
| thread-uts | bolts | 15 | Unified Thread Standard (UTS) |
| thread-bsw | bolts | 16 | British Standard Whitworth (BSW) |
| thread-buttress | bolts | 17 | Buttress thread |
| thread-unc | bolts | 18, 19, 20 | Unified National Coarse (UNC) |
| thread-unf | bolts | 18, 20 | Unified National Fine (UNF) |
| thread-nc | bolts | 18, 19 | National Coarse (NC) |
| thread-nf | bolts | 18 | National Fine (NF) |
| fit-1 | bolts | 23 | Class 1 |
| fit-2 | bolts | 23 | Class 2 |
| fit-3 | bolts | 23 | Class 3 |
| fit-4 | bolts | 23 | Class 4 |
| fit-5 | bolts | 23 | Class 5 |
| mark-standard | bolts | 34, 35 | Cross or asterisk |
| mark-cres | bolts | 34, 35 | One dash |
| mark-close | bolts | 34, 35 | Triangle |
| mark-aluminum | bolts | 34, 35 | Double dash |
| mark-unmarked | bolts | 34, 36 | No marking |
| an-h | bolts | 36, 41 | H |
| an-a | bolts | 36, 41, 43 | A |
| an-c | bolts | 35, 41 | C |
| an-dd | bolts | 35, 41 | DD |
| an-general | bolts | 28, 39 | AN3 through AN20 |
| engine-fine | bolts | 28, 29, 31 | MS20073 |
| engine-coarse | bolts | 28, 29, 31 | MS20074 |
| nas-standard | bolts | 28, 49 | NAS1103 through NAS1120 |
| internal-wrench-family | bolts | 57 | MS20004 through MS20024 |
| bolt-grip | bolts | 40 | Grip length |
| bolt-length | bolts | 40 | AN bolt length |
| bolt-diameter | bolts | 40, 41 | Bolt shank diameter |
| approved-hardware | bolts | 5 | Traceability and appropriate certification for the specified part |
| bolt-ipc | bolts | 60 | Applicable maintenance data and the IPC |
| bolt-tpi | bolts | 18, 20 | 28 threads per inch |
| nas-grip-code | bolts | 49 | Grip length in sixteenths of an inch |
| an-length-code | bolts | 41, 43, 46 | It combines whole inches and remaining eighths |
| internal-wrench-tool | bolts | 57, 58 | Hex wrench / Allen key |
| bolt-fillet | bolts | 57 | The radius between the head and shank |
| bolt-orientation | bolts | 60 | Head up or toward flight direction, with moving-part clearance |
| nut-an310 | nuts | 6, 8 | AN310 castle nut |
| nut-an320 | nuts | 6, 9 | AN320 shear castle nut |
| nut-an315 | nuts | 6, 11 | AN315 plain nut |
| nut-an316 | nuts | 6, 12 | AN316 check / jam nut |
| nut-an350 | nuts | 6, 13 | AN350 wing nut |
| nut-an340 | nuts | 6, 14 | AN340 machine-screw nut |
| nut-an345 | nuts | 6, 14 | AN345 machine-screw nut |
| nut-an355 | nuts | 6, 15 | AN355 slotted engine nut |
| nut-an360 | nuts | 15 | AN360 plain engine nut |
| nut-an365 | nuts | 16, 21 | AN365 fibre self-locking nut |
| nut-an364 | nuts | 16, 22 | AN364 shallow fibre nut |
| nut-an363 | nuts | 16, 24 | AN363 metal self-locking nut |
| nut-nas679 | nuts | 16, 25 | NAS679 metal self-locking nut |
| nut-plate | nuts | 26, 27 | Anchor nut / nut plate |
| tinnerman | nuts | 28, 29 | Tinnerman nut |
| nut-locking-area | nuts | 17 | Cut or damage it with a tap or other cutting tool |
| nut-rotation | nuts | 18 | Do not use them where the bolt or nut is subject to rotation in service |
| nut-engagement | nuts | 18 | One to three threads |
| nut-size-code | nuts | 20 | AN6 |
| nut-grip-action | nuts | 17 | Slightly smaller than the normal minor thread diameter |
| washer-an960 | nuts | 31, 32 | AN960 plain washer |
| washer-an970 | nuts | 31, 32, 34 | AN970 penny washer |
| washer-an935 | nuts | 31, 35, 36 | AN935 split lock washer |
| washer-an936 | nuts | 31, 35, 37 | AN936 shake-proof washer |
| washer-ms20002 | nuts | 31, 38 | MS20002 countersunk washer |
| washer-light | nuts | 32, 36 | L suffix |
| washer-star-a | nuts | 37 | AN936 type A |
| washer-star-b | nuts | 37 | AN936 type B |
| washer-star-c | nuts | 37 | AN936 type C |
| washer-purpose | nuts | 30 | Provide a bearing surface and adjust spacing or nut position |
| lock-washer-plain | nuts | 35 | A plain washer |
| nut-brass-instruments | nuts | 28 | Brass is nonmagnetic |
| washer-types | nuts | 30 | Plain, lock and special |
| machine-screw | screws-pins | 5, 6 | Machine screw |
| structural-screw | screws-pins | 5, 14 | Structural screw |
| self-tapping | screws-pins | 5, 18, 19 | Self-tapping screw |
| fillister-screw | screws-pins | 9 | Fillister-head screw |
| flat-head-screw | screws-pins | 10, 11 | Flat-head screw |
| round-head-screw | screws-pins | 12 | AN515 round-head screw |
| truss-head-screw | screws-pins | 13 | AN526 truss-head screw |
| washer-head-screw | screws-pins | 17 | AN525 washer-head structural screw |
| screw-drive | screws-pins | 4 | A slot or recess for a screwdriver |
| self-tap-a | screws-pins | 18 | Sharp point |
| self-tap-b | screws-pins | 18 | Blunt point and finer threads than type A |
| structural-cross | screws-pins | 15, 16 | The steel material identified in the course |
| structural-grip | screws-pins | 6, 14 | A grip section with bolt-like tolerances |
| roll-pin | screws-pins | 20, 21 | Roll pin |
| clevis-pin | screws-pins | 20, 22 | Clevis pin |
| cotter-pin | screws-pins | 20, 23 | Cotter pin |
| taper-pin | screws-pins | 24, 25 | Taper pin |
| pin-an385 | screws-pins | 24 | AN385 |
| pin-an386 | screws-pins | 24 | AN386 |
| cotter-an380 | screws-pins | 23 | AN380 |
| cotter-an381 | screws-pins | 23 | AN381 |
| cotter-code-diameter | screws-pins | 23 | Diameter in thirty-seconds of an inch |
| cotter-code-length | screws-pins | 23 | Length in quarter-inches |
| clevis-length-reference | screws-pins | 22 | From under the head to the cotter-pin hole |
| dzus | screws-pins | 26, 27 | Dzus |
| camloc | screws-pins | 26, 29 | Camloc |
| airloc | screws-pins | 26, 31 | Airloc |
| turn-lock-use | screws-pins | 26 | Nonstructural access-panel fastening |
| dzus-stud | screws-pins | 27 | Stud |
| dzus-spring | screws-pins | 27 | To the airframe |
| camloc-grommet | screws-pins | 29 | Grommet |
| camloc-receptacle | screws-pins | 29 | To the airframe |
| camloc-tool | screws-pins | 30 | Camloc pliers |
| airloc-cross-pin | screws-pins | 31 | Cross pin |

## External measurement practice

The five reading/scale prompts were removed from both active question pools at the user's request. Module 2 links to imperial/metric micrometer, imperial vernier caliper and imperial dial caliper simulators from Measuring Tools slide 74. Their destination pages were verified on 2026-10-21; see src/data/measurementSimulators.js. The full review remains 40 questions, eight per presentation, from the revised 224-question pool.
