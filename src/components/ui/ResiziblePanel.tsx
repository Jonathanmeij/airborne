import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export function ResizablePanel({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={id}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            //   x: 0,
            transition: { duration: 0.3, delay: 0.2 },
          }}
          exit={{
            opacity: 0,
            //   x: "-100%",
            transition: { duration: 0.3 },
          }}
        >
          <div
            ref={ref}
            className={`${height ? "absolute" : "relative"} w-full p-1`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
