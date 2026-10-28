
import { Application, extend } from '@pixi/react';
import { Graphics } from 'pixi.js';
import { useCallback } from 'react';

extend({ Graphics });

export default function App() {
  const draw = useCallback((graphics: Graphics) => {
    graphics.clear();
    graphics.roundRect(50, 50, 400, 250, 20);
    graphics.fill(0x172554);
    graphics.stroke({ color: 0xfbbf24, width: 5 });
  }, []);

  return (
    <main>
      <h1>Slot Game</h1>

      <Application width={500} height={350}
        background={0x101020}>
        <pixiGraphics draw={draw} />
      </Application>
    </main>
  );
}
