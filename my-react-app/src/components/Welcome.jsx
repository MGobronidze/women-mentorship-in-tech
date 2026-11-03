function Welcome() {
  const studentName = "ლანა";

  return (
    <div className="welcome">
      <h1>გამარჯობა, {studentName}!</h1>    {/* {} ჩასვამს JS ცვლადს JSX-ში */}
      <p>კეთილი იყოს შენი დაბრუნება React-ის სამყაროში.</p>
    </div>
  );
}

export default Welcome;