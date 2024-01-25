import React from "react";
import Image from "next/image";

const LoginPage: React.FC = () => {
    return (
        <div className="flex justify-center	">
            <div>
                <Image className="login-logo w-56 mt-5" src="/images/AIStoreLogo.png" alt="LOGO" width={800} height={500} />
            </div>
        </div>
    );
};

export default LoginPage;
