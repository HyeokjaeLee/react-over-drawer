"use client";

import "./OverDrawer.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";

interface OverDrawerProps {
  renderTo?: () => HTMLElement | null;
  isOpened?: boolean;
  onClose?: () => void;
  breakPoint?: number;
  children?: React.ReactNode;
}

const FPS_120 = 1_000 / 120;

type SwipeState = "idle" | "swiping" | "addtional-swiping";

export const OverDrawer = ({
  renderTo = () => document.body,
  isOpened = true,
  breakPoint = 300,
  children,
}: OverDrawerProps) => {
  const [container, setContainer] = useState<HTMLElement | null>();
  const [deltaY, setDeltaY] = useState(isOpened ? -breakPoint : 0);
  const [swipeState, setSwipeState] = useState<SwipeState>("idle");

  const drawerRef = useRef<HTMLElement | null>(null);

  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!drawerRef.current) return;
    setHeight(drawerRef.current.offsetHeight);
  });

  useEffect(() => {
    setContainer(renderTo);
  }, [renderTo]);

  const swipeable = useSwipeable({
    trackMouse: true,
    onSwiping: ({ deltaY }) => {
      setSwipeState("swiping");
      setDeltaY(deltaY);
    },
    onSwiped: ({}) => {
      setSwipeState("addtional-swiping");
    },
  });

  useEffect(() => {
    switch (swipeState) {
      case "swiping":
        return document.body.classList.add("over_drawer_body_locked");
      case "addtional-swiping":
        return setSwipeState("idle");
      case "idle":
        return document.body.classList.remove("over_drawer_body_locked");
    }
  }, [swipeState]);

  return container
    ? createPortal(
        <article
          {...swipeable}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          ref={(el) => {
            swipeable.ref(el);

            drawerRef.current = el;
          }}
          className="over_drawer"
          style={{
            transform: `translate3d(0, ${height + deltaY}px, 0)`,
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "9999px",
              backgroundColor: "red",
            }}
          >
            ss
          </div>
          {children}
        </article>,
        container,
      )
    : null;
};
