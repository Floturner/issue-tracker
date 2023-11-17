type Props = {
  size?: number;
  border?: number;
};

export default function Spinner({ size = 4, border = 2 }: Props) {
  return (
    <div
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-${border} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
}
