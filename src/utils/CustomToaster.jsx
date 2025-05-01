import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName="font-League_Spartan"
            containerStyle={{}}
            toastOptions={{
                className: "",
                duration: 5000,
                style: {
                    background: "#363636",
                    color: "#fff",
                },

                success: {
                    duration: 3000,
                    theme: {
                        primary: "green",
                        secondary: "black",
                    },
                },
            }}
        />
    );
};

export default CustomToaster;