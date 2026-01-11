import HiddenMessage from './hiddenMessage'
import Items from './components/items';
import TestUI from './components/testUI';
function App() {
  return (
    <div className="App">
      <HiddenMessage>本条款适用于该公司所有产品</HiddenMessage>
      <Items />
      <TestUI />
    </div>
  );
}

export default App;
