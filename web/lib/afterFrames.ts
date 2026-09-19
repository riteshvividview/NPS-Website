/**
 * Runs a callback two animation frames from now and returns a cancel
 * function. ScrollTriggers created in a component effect measure their
 * pixel positions against the layout at that moment; this page's Hero pin
 * (built in useHomeAnimations, a later sibling effect) adds ~2200px of
 * spacer afterwards, so triggers created immediately cache stale positions
 * that never self-correct. Deferring creation until the layout has settled
 * sidesteps that (see components/home/WhyUs/useWhyUsAnimations.ts).
 */
export function afterFrames(cb: () => void): () => void {
  let raf2 = 0;
  const raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(cb);
  });
  return () => {
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}
