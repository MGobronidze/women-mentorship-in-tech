import Welcome from './components/Welcome';
import Greeting from './components/Greeting';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Welcome />
      <Greeting name="ლანა" />
      <Greeting name="მარიამ" role="მასწავლებელი" age={30} />
      <Profile />
    </div>
  );
}

export default App;