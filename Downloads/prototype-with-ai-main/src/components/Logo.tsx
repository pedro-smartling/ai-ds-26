import Image from 'next/image';

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src="https://www.smartling.com/hubfs/SmartlingWebsite-WCS/Frame%20(17).svg"
        alt="Smartling Logo"
        width={160}
        height={32}
        className="dark:invert ultra:invert"
      />
    </div>
  );
} 