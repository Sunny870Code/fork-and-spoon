
// import React, { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AnimatedOTP() {
//   const maxLength = 6;

//   const [value, setValue] = useState("");
//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     const newValue = e.target.value
//       .replace(/\D/g, "")
//       .slice(0, maxLength);

//     setValue(newValue);
//   };

//   const handleBoxClick = () => {
//     inputRef.current?.focus();
//   };

//   return (
//     <div className="flex h-[40%] items-center justify-center bg-[#FFF8EC]">
//       <div className="flex w-full max-w-sm flex-col items-center gap-2 rounded-2xl border border-gray-500 bg-gray-300 px-4 pt-2 pb-1">

//         {/* Hidden input */}
//         <input
//           ref={inputRef}
//           type="text"
//           inputMode="numeric"
//           autoComplete="one-time-code"
//           value={value}
//           onChange={handleChange}
//           maxLength={maxLength}
//           className="absolute h-0 w-0 opacity-0"
//         />

//         {/* OTP boxes */}
//         <div
//           onClick={handleBoxClick}
//           className="flex cursor-text items-center justify-center gap-0.5"
//         >
//           {Array.from({ length: maxLength }).map((_, index) => {
//             const char = value[index];
//             const isActive = index === value.length;

//             return (
//               <OTPBox
//                 key={index}
//                 char={char}
//                 isActive={isActive}
//               />
//             );
//           })}
//         </div>

//         {/* Entered code */}
//         <div className="text-xs text-zinc-500">
//           {value ? (
//             <>
//               Entered Code:{" "}
//               <span className="font-mono font-semibold tracking-widest text-white">
//                 {value}
//               </span>
//             </>
//           ) : (
//             "Type your verification code"
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// function OTPBox({ char, isActive }) {
//   const [pulse, setPulse] = useState(false);

//   React.useEffect(() => {
//     if (char) {
//       setPulse(true);

//       const timer = setTimeout(() => {
//         setPulse(false);
//       }, 400);

//       return () => clearTimeout(timer);
//     }
//   }, [char]);

//   return (
//     <div
//       className={`
//         relative flex h-12 w-10
//         items-center justify-center
//         rounded-lg border
//         transition-all duration-200

//         ${
//           isActive
//             ? "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.25)]"
//             : "border-zinc-700"
//         }

//         bg-gradient-to-br
//         from-zinc-800/70
//         to-zinc-900
//       `}
//     >
//       {/* Character */}
//       <AnimatePresence mode="popLayout">
//         {char && (
//           <motion.span
//             key={char}
//             initial={{
//               opacity: 0,
//               scale: 0.5,
//               y: 4,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               y: 0,
//             }}
//             exit={{
//               opacity: 0,
//               scale: 0.7,
//               y: -4,
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 450,
//               damping: 28,
//             }}
//             className="absolute font-mono text-md font-bold text-white"
//           >
//             {char}
//           </motion.span>
//         )}
//       </AnimatePresence>

//       {/* Pulse effect */}
//       <AnimatePresence>
//         {pulse && (
//           <motion.div
//             initial={{
//               opacity: 0.8,
//               scale: 0.9,
//             }}
//             animate={{
//               opacity: 0,
//               scale: 1.4,
//             }}
//             exit={{
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.4,
//               ease: "easeOut",
//             }}
//             className="pointer-events-none absolute inset-0 rounded-lg border border-blue-500"
//           />
//         )}
//       </AnimatePresence>

//       {/* Active bottom line */}
//       {isActive && (
//         <motion.div
//           layoutId="active-line"
//           className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-blue-500"
//           initial={{ opacity: 0, scaleX: 0 }}
//           animate={{ opacity: 1, scaleX: 1 }}
//         />
//       )}

//       {/* Fake caret */}
//       {isActive && (
//         <motion.div
//           className="absolute h-5 w-[2px] bg-blue-500"
//           animate={{
//             opacity: [1, 0, 1],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 1,
//           }}
//         />
//       )}
//     </div>
//   );
// }

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedOTP({ onVerify }) {
  const maxLength = 6;

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value
      .replace(/\D/g, "")
      .slice(0, maxLength);

    setValue(newValue);
  };

  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (value.length !== maxLength) {
      alert("Please enter the complete OTP");
      return;
    }

    // Send OTP to parent
    onVerify(value);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className="absolute h-0 w-0 opacity-0"
      />

      {/* OTP boxes */}
      <div
        onClick={handleBoxClick}
        className="flex cursor-text gap-2"
      >
        {Array.from({ length: maxLength }).map((_, index) => {
          const char = value[index];
          const isActive = index === value.length;

          return (
            <OTPBox
              key={index}
              char={char}
              isActive={isActive}
            />
          );
        })}
      </div>

      {/* Verify button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={value.length !== maxLength}
        className="w-full rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Verify OTP
      </button>

    </div>
  );
}

function OTPBox({ char, isActive }) {
  const [pulse, setPulse] = useState(false);

  React.useEffect(() => {
    if (char) {
      setPulse(true);

      const timer = setTimeout(() => {
        setPulse(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [char]);

  return (
    <div
      className={`
        relative flex h-12 w-10
        items-center justify-center
        rounded-lg border
        bg-gradient-to-br from-zinc-800/70 to-zinc-900
        ${
          isActive
            ? "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.25)]"
            : "border-zinc-700"
        }
      `}
    >
      <AnimatePresence mode="popLayout">
        {char && (
          <motion.span
            key={char}
            initial={{ opacity: 0, scale: 0.5, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -4 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 28,
            }}
            className="absolute font-mono text-lg font-bold text-white"
          >
            {char}
          </motion.span>
        )}
      </AnimatePresence>

      {pulse && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 rounded-lg border border-blue-500"
        />
      )}

      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-blue-500"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
        />
      )}
    </div>
  );
}