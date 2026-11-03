function Profile() {
  const isOnline = true;
  const skills = ["HTML", "CSS", "JavaScript", "React"];

  return (
    <section>
      <p>{isOnline ? "🟢 ონლაინ" : "⚪ ოფლაინ"}</p>

      {isOnline && <button>message</button>}

      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}


export default Profile;