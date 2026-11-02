function Greeting({ name, role = "სტუდენტი" , age=25}) {   // role-ს აქვს ნაგულისხმევი მნიშვნელობა
  return <p>გამარჯობა, {name}! შენ ხარ {role}, ხოლო ასაკი არის {age}.</p>;
}

export default Greeting;