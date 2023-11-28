import { 
  FC,
  RefObject,
  useEffect,
  useRef
} from 'react';

interface ResizerProps {
  widthSetter: (width: number) => void;
  navigationRef: RefObject<HTMLElement>;
}

const Resizer: FC<ResizerProps> = ({
  widthSetter, 
  navigationRef
}) => {
  const resizerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const resize = (event: MouseEvent) => {
      event.preventDefault();
      if (navigationRef.current !== null) {
        widthSetter(
          event.pageX - navigationRef.current?.getBoundingClientRect().left
        );
      }
    }

    const stopResize = (event: MouseEvent) => {
      event.preventDefault();
      globalThis.removeEventListener("mousemove", resize);
    }

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      globalThis.addEventListener("mousemove", resize);
      globalThis.addEventListener("mouseup", stopResize);
    }

    if (resizerRef.current !== null) {
      resizerRef.current.addEventListener("mousedown", onMouseDown);
    }
  }, []);

  return (
    <div
      className={`w-[20px] h-full bg-transparent flex justify-center absolute translate-x-[10px] right-0 cursor-e-resize group`}
      ref={resizerRef}
    >
      <div className={`w-[2px] h-full bg-transparent group-hover:bg-slate-200 transition`}></div>
    </div>
  );
}

export default Resizer;