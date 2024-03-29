interface MessageBoxProps {
  message: string | null;
  className?: string;
}

export default function MessageBox({ message, className }: MessageBoxProps) {
  return (
    <div>
      <p className={`text-center ${className}`}>{message}</p>
    </div>
  );
}
