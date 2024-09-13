import Form from "./Form"

export function Login() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
      <Form />
      </div>
      <div className="hidden lg:flex h:full w-1/2 items-center justify-center bg-gray-200">
      <div className="w-80 h-80 animate-bounce">
      <img src="/MealMentorLogo.webp" alt="Logo de MealMentor" />
      <div/>
      </div>
      </div>
    </div>
  );
}