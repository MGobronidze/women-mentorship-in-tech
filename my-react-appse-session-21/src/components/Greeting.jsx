function Greeting({ name, role = "სტუდენტი", age = 18}) {   // role-ს აქვს ნაგულისხმევი მნიშვნელობა
  return <p>გამარჯობა, {name}! შენ ხარ {role} და შენ ხარ {age} წლის.</p>;
}

export default Greeting;