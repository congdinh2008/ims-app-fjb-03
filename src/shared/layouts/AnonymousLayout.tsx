function AnonymousLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <main className="flex-grow relative">
                <img src="https://media.tapchitaichinh.vn/images/upload//2023/09/18/fpt-tower.jpg" alt="bg" className="h-screen w-full object-cover" />
                <div className="form-section w-full md:w-1/3 p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AnonymousLayout
