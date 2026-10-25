/** Fine column rules behind the page: the drafting grid the layout sits on. */
export function PageFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="mx-auto h-full w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="frame-rules h-full border-r border-line/40 opacity-50" />
      </div>
    </div>
  );
}
