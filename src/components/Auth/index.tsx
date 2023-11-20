import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import logo from "../../assets/logo_updrade.png";
import { BsPeople } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useCreateUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import { useLogin } from "@/hooks/useAuth";

enum typePopup {
  LOGIN,
  REGISTER,
}

enum typeComponent {
  LOGIN_BY_ACCOUNT,
  REGISTER_BY_ACCOUNT,
  LOGIN_BY_GMAIL,
  REGISTER_BY_GMAIL,
  NONE,
}

const MainContent = ({
  handleButton,
}: {
  handleButton: { handleAccountBtn: () => void; handleGmailBtn: () => void };
}) => {
  const { handleAccountBtn, handleGmailBtn } = handleButton;
  return (
    <div className='flex flex-col mb-10 font-medium'>
      <button
        className='flex px-8 text-md hover:bg-gray-200 py-2 border-[2px] border-gray-200 rounded-3xl min-w-[200px] max-w-[360px]'
        onClick={handleAccountBtn}
      >
        <BsPeople className='text-2xl' />
        <p className='w-full'>Sử dụng email</p>
      </button>
      <button
        className='flex px-8 text-md hover:bg-gray-200 py-2 border-[2px] border-gray-200 rounded-3xl min-w-[200px] mt-2 max-w-[360px]'
        onClick={handleGmailBtn}
      >
        <FcGoogle className='text-2xl' />
        <p className='w-full'>Tiếp tục với Google</p>
      </button>
    </div>
  );
};

const LoginByAccount = ({ handleClose }: { handleClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isSuccess, mutateAsync } = useLogin();

  useEffect(() => {
    isSuccess && handleClose();
  }, [handleClose, isSuccess]);

  return (
    <div className='mt-8 flex justify-center flex-col'>
      <div className='w-full px-8'>
        <input
          type='text'
          placeholder='Địa chỉ email'
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='w-full px-8 mt-4'>
        <input
          type='password'
          placeholder='Mật khẩu'
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='w-full px-8 mt-4 mb-8'>
        <button
          className='w-full text-center bg-red-400 text-white py-2 px-4 rounded-3xl'
          onClick={() => {
            mutateAsync({ email, password });
          }}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
};

const RegisterByAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const { isLoading, mutateAsync } = useCreateUser();

  const handleRegister = async () => {
    if (password !== rePassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    await mutateAsync({ email, password, firstName, lastName });
  };

  return (
    <div className='mt-8 flex justify-center flex-col'>
      <div className='w-full px-8 -mt-4'>
        <input
          type='text'
          placeholder='Họ'
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
          onChange={(e) => setfirstName(e.target.value)}
        />
      </div>
      <div className='w-full px-8 mt-2'>
        <input
          type='text'
          placeholder='Tên'
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
          onChange={(e) => setlastName(e.target.value)}
        />
      </div>
      <div className='w-full px-8 mt-2'>
        <input
          type='text'
          placeholder='Địa chỉ email'
          name='email_register'
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='w-full px-8 mt-2'>
        <input
          type='password'
          placeholder='Mật khẩu'
          name='password_register'
          onChange={(e) => setPassword(e.target.value)}
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
        />
      </div>
      <div className='w-full px-8 mt-2'>
        <input
          type='password'
          placeholder='Nhập lại mật khẩu'
          onChange={(e) => setRePassword(e.target.value)}
          className='border w-full px-6 py-2 rounded-3xl focus:outline-none'
        />
      </div>
      <div className='w-full px-8 mt-4 mb-8'>
        <button
          className='w-full text-center bg-red-400 text-white py-2 px-4 rounded-3xl'
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Đăng ký"}
        </button>
      </div>
    </div>
  );
};

const LoginByGmail = () => {
  return <>LoginByGmail</>;
};

const RegisterByGmail = () => {
  return <>RegisterByGmail</>;
};

function Auth({
  isPopupOpen,
  handleClose,
}: {
  isPopupOpen: boolean;
  handleClose: () => void;
}) {
  const [type, setType] = useState(typePopup.LOGIN);
  const [tab, setTab] = useState(typeComponent.NONE);

  return (
    <div>
      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 select-none transition duration-500 ease-in-out'>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='relative z-10 bg-white px-24 py-12 rounded-lg shadow-lg'>
            <button onClick={handleClose}>
              <MdCancel className='absolute text-[32px] text-gray-500 hover:text-red-500 top-3 right-3' />
            </button>
            <div className='flex justify-center mb-8'>
              <img src={logo} alt='logo upgrade' className='h-16' />
            </div>
            <h2 className='text-3xl font-semibold mb-14 text-center'>
              {type === typePopup.LOGIN
                ? "Đăng nhập UpGrade"
                : "Đăng ký UpGrade"}
            </h2>
            {tab === typeComponent.NONE && (
              <MainContent
                handleButton={{
                  handleAccountBtn: () => {
                    if (type === typePopup.LOGIN) {
                      setTab(typeComponent.LOGIN_BY_ACCOUNT);
                    } else {
                      setTab(typeComponent.REGISTER_BY_ACCOUNT);
                    }
                  },
                  handleGmailBtn: () => {
                    if (type === typePopup.LOGIN) {
                      setTab(typeComponent.LOGIN_BY_GMAIL);
                    } else {
                      setTab(typeComponent.REGISTER_BY_GMAIL);
                    }
                  },
                }}
              />
            )}
            {tab === typeComponent.LOGIN_BY_ACCOUNT && (
              <LoginByAccount handleClose={handleClose} />
            )}
            {tab === typeComponent.REGISTER_BY_ACCOUNT && <RegisterByAccount />}
            {tab === typeComponent.LOGIN_BY_GMAIL && <LoginByGmail />}
            {tab === typeComponent.REGISTER_BY_GMAIL && <RegisterByGmail />}
            <div className='flex justify-center mb-10'>
              <div className='flex'>
                Bạn {type === typePopup.LOGIN ? "chưa" : "đã"} có tài khoản?{" "}
                <button
                  className='ml-1 text-red-500'
                  onClick={() => {
                    setType(
                      type === typePopup.LOGIN
                        ? typePopup.REGISTER
                        : typePopup.LOGIN
                    );
                    setTab(typeComponent.NONE);
                  }}
                >
                  {type === typePopup.LOGIN ? "Đăng ký" : "Đăng nhập"}
                </button>
              </div>
            </div>
            <div className='max-w-[360px] text-[12px] text-center text-gray-500'>
              Việc bạn tiếp tục sử dụng trang web này đồng nghĩa với việc bạn
              đồng ý với điều khoản sử dụng của chúng tôi
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
