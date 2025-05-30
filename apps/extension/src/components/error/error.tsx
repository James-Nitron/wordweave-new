const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-2xl font-bold text-red-500">Oops!</h1>
      <p className="text-center text-sm text-gray-500 font-bold">
        Something went wrong.
      </p>
      <p className="text-center text-xs text-gray-500">
        We're working behind the scenes to fix it.
      </p>
    </div>
  )
}

export default Error
