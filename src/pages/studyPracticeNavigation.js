export function studyPracticeNavigation(pathname) {
  const aeroFamily = /^\/study\/aerodynamics\/module-2\/(?:practice-[12]|one-word-1)$/;
  const part = /^\/study\/aerodynamics\/module-2\/(?:practice-[12]|one-word-1)\/part-[1-9]\d*$/;
  const practice = /^\/study\/[^/]+\/[^/]+\/(?:practice-\d+|one-word-\d+|torque-bolt-nut|resistor-band-calculations)$/;
  return { onPractice:part.test(pathname) || (practice.test(pathname) && !aeroFamily.test(pathname)), testsPath:pathname.slice(0,pathname.lastIndexOf("/")) };
}
