function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="flex justify-center items-center p-4 bg-blue-500 text-white">
            <p>&copy; Cong Dinh {year}, All rights reserved.</p>
        </footer>
    );
}

export default Footer;