import { typography } from "../style/typoghraphy";

const Loading = () => {
  return (
    <div className="flex items-end gap-1 h-6">
      <span className="w-1 h-3 bg-orange-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
      <span className={typography.loading}></span>
      <span className={typography.loading}></span>
    </div>
  );
};

export default Loading;
