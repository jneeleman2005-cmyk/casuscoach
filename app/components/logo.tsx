export default function Logo() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 shadow-sm">
      <svg
        viewBox="0 0 64 64"
        className="h-8 w-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M32 10L47 16V30C47 40.5 40.7 48.7 32 52C23.3 48.7 17 40.5 17 30V16L32 10Z"
          fill="white"
          fillOpacity="0.16"
        />

        <path
          d="M32 10L47 16V30C47 40.5 40.7 48.7 32 52C23.3 48.7 17 40.5 17 30V16L32 10Z"
          stroke="white"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <path
          d="M32 21V42"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M23 27H41"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M26 42H38"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M25 27L20 36H30L25 27Z"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        <path
          d="M39 27L34 36H44L39 27Z"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}