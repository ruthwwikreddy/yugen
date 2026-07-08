export function OGImagePreview() {
  return (
    <div 
      className="w-full max-w-[1200px] mx-auto"
      style={{ aspectRatio: '1200/630' }}
    >
      <img 
        src="/image.png" 
        alt="Yūgen Summit 6.0 OG Image"
        className="w-full h-full object-cover rounded-lg shadow-xl"
      />
    </div>
  )
}
