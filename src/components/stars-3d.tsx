'use client';
import { useEffect, useRef } from "react";

// Babylon star dust: drifts, rotates with scroll, camera dollies forward as you scroll.
const Stars3D = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const [{ Engine }, { Scene }, { FreeCamera }, { Vector3, Color3, Color4 }, { StandardMaterial }, { Mesh }, { VertexData }] = await Promise.all([
        import("@babylonjs/core/Engines/engine"),
        import("@babylonjs/core/scene"),
        import("@babylonjs/core/Cameras/freeCamera"),
        import("@babylonjs/core/Maths/math"),
        import("@babylonjs/core/Materials/standardMaterial"),
        import("@babylonjs/core/Meshes/mesh"),
        import("@babylonjs/core/Meshes/mesh.vertexData"),
      ]);
      if (disposed) return;

      const engine = new Engine(canvas, true, { alpha: true, powerPreference: "high-performance" }, false);
      const scene = new Scene(engine);
      scene.clearColor = new Color4(0, 0, 0, 0);
      const cam = new FreeCamera("cam", new Vector3(0, 0, -10), scene);
      cam.setTarget(Vector3.Zero());

      const pos: number[] = [];
      for (let i = 0; i < 500; i++) pos.push((Math.random() - 0.5) * 36, (Math.random() - 0.5) * 24, Math.random() * 20 - 4);
      const dust = new Mesh("dust", scene);
      const vd = new VertexData();
      vd.positions = pos;
      vd.applyToMesh(dust);
      const dm = new StandardMaterial("dm", scene);
      dm.disableLighting = true;
      dm.pointsCloud = true;
      dm.pointSize = 2;
      dust.material = dm;
      // stars show in dark mode only; follows the theme toggle
      const tint = () => {
        const dark = document.documentElement.classList.contains("dark");
        dm.emissiveColor = new Color3(0.7, 0.8, 1);
        dm.alpha = 0.6;
        dm.pointSize = 2;
        canvas.style.visibility = dark ? "visible" : "hidden"; // light mode uses the gradient background instead
      };
      tint();
      const mo = new MutationObserver(tint);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      let prog = 0, mx = 0;
      const onScroll = () => { prog = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
      const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onMove, { passive: true });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let time = 0;
      scene.onBeforeRenderObservable.add(() => {
        const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);
        if (!reduce) time += dt;
        dust.rotation.y = time * 0.02 + prog * 1.2;
        dust.rotation.x = prog * 0.5;
        cam.position.z = -10 + prog * 3;
        cam.position.x += (mx * 0.8 - cam.position.x) * Math.min(1, dt * 4);
        cam.setTarget(Vector3.Zero());
      });

      let running = false;
      const loop = () => scene.render();
      const set = (on: boolean) => { if (on !== running) { running = on; on ? engine.runRenderLoop(loop) : engine.stopRenderLoop(loop); } };
      set(!document.hidden);
      const onVis = () => set(!document.hidden);
      const onResize = () => engine.resize();
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("resize", onResize);

      cleanup = () => {
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onMove);
        mo.disconnect();
        engine.stopRenderLoop();
        scene.dispose();
        engine.dispose();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5] h-screen w-screen" />;
};

export default Stars3D;
