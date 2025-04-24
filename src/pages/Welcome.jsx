const Welcome = () => {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 border shadow rounded text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Welcome to Pzafira!</h1>
        <p className="text-lg mb-6">Your account has been successfully activated.</p>
        <a
          href="/login"
          className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors"
        >
          Go to Login
        </a>
      </div>
    );
  };
  
  export default Welcome;
  