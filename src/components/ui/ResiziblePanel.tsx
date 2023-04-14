import { AnimatePresence, motion } from "framer-motion";
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
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={id}
          initial={{
            opacity: 0,
            // x: 382,
          }}
          animate={{
            opacity: 1,
            // x: 0,
            transition: { duration: 0.4 },
          }}
          exit={{
            opacity: 0,
            // x: -382,
            transition: { duration: 0.4 },
          }}
        >
          <div
            ref={ref}
            className={`${height ? "absolute" : "relative"} w-full`}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
