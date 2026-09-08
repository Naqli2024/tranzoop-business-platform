import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import '../../assets/styles/landingPage.css';

function CardRotate({
  children,
  cardId,
  onSendToBack,
  sensitivity,
  disableDrag = false,
  swipeCommand,
  onSwiped
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-16, 16]);

  const likeOpacity = useTransform(x, [24, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -24], [1, 0]);

  const flying = useRef(false);

  const flyOut = (direction) => {
    if (flying.current) return;
    flying.current = true;

    const targetX = direction === 'right' ? 620 : -620;

    animate(x, targetX, { duration: 0.32, ease: 'easeIn' });
    animate(y, -30, { duration: 0.32, ease: 'easeIn' });

    setTimeout(() => {
      onSwiped && onSwiped();
      onSendToBack();
      x.set(0);
      y.set(0);
      flying.current = false;
    }, 320);
  };

  useEffect(() => {
    if (swipeCommand && swipeCommand.id === cardId) {
      flyOut(swipeCommand.direction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeCommand]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity) {
      flyOut(info.offset.x > 0 ? 'right' : 'left');
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 22 });
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 22 });
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotate }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.7}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      <motion.span
        className="swipe-stamp swipe-stamp-accept"
        style={{ opacity: likeOpacity }}
        aria-hidden="true"
      >
        <FiCheck size={16} /> ACCEPT
      </motion.span>
      <motion.span
        className="swipe-stamp swipe-stamp-reject"
        style={{ opacity: nopeOpacity }}
        aria-hidden="true"
      >
        <FiX size={16} /> SKIP
      </motion.span>
      {children}
    </motion.div>
  );
}

export default function CardsSection({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  showActions = true
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [swipeCommand, setSwipeCommand] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    } else {
      return [
        {
          id: 1,
          content: (
            <img
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
              alt="card-1"
              className="card-image"
            />
          )
        },
        {
          id: 2,
          content: (
            <img
              src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
              alt="card-2"
              className="card-image"
            />
          )
        },
        {
          id: 3,
          content: (
            <img
              src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
              alt="card-3"
              className="card-image"
            />
          )
        },
        {
          id: 4,
          content: (
            <img
              src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
              alt="card-4"
              className="card-image"
            />
          )
        }
      ];
    }
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = (id) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      if (index === -1) return prev;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused && !swipeCommand) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        setSwipeCommand({ id: topCardId, direction: 'right' });
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayDelay, stack, isPaused, swipeCommand]);

  const handleManualSwipe = (direction) => {
    if (!stack.length || swipeCommand) return;
    const topCardId = stack[stack.length - 1].id;
    setSwipeCommand({ id: topCardId, direction });
  };

  return (
    <div className="stack-wrapper">
      <div
        className="stack-container"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {stack.map((card, index) => {
          const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
          return (
            <CardRotate
              key={card.id}
              cardId={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              disableDrag={shouldDisableDrag}
              swipeCommand={swipeCommand}
              onSwiped={() => setSwipeCommand(null)}
            >
              <motion.div
                className="card"
                onClick={() => shouldEnableClick && sendToBack(card.id)}
                animate={{
                  rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                  scale: 1 + index * 0.06 - stack.length * 0.06,
                  transformOrigin: '90% 90%'
                }}
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping
                }}
              >
                {card.content}
              </motion.div>
            </CardRotate>
          );
        })}
      </div>

      {showActions && (
        <div className="stack-actions">
          <button
            type="button"
            className="stack-action-btn stack-action-btn-reject"
            onClick={() => handleManualSwipe('left')}
            aria-label="Skip"
          >
            <FiX size={20} />
          </button>
          <button
            type="button"
            className="stack-action-btn stack-action-btn-accept"
            onClick={() => handleManualSwipe('right')}
            aria-label="Accept"
          >
            <FiCheck size={20} />
          </button>
        </div>
      )}
    </div>
  );
}