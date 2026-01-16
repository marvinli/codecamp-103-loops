import { useAtomValue } from 'jotai';
import { currentStateAtom } from '../../../atoms';
import './StatePanel.css';

function StatePanel() {
  const currentState = useAtomValue(currentStateAtom);

  if (!currentState) {
    return (
      <div className="state-panel">
        <div className="state-panel-empty">
          <p>Eat a flag to learn about a state!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="state-panel">
      <div className="state-header">
        <img src={currentState.shape} alt={`${currentState.name} shape`} className="state-shape" />
        <h2>{currentState.name}</h2>
      </div>

      <div className="state-flag-large">
        <img src={currentState.flag} alt={`${currentState.name} flag`} />
      </div>

      <div className="state-info">
        <div className="info-row">
          <span className="info-label">Capital:</span>
          <span className="info-value">{currentState.capital}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Population:</span>
          <span className="info-value">{currentState.population.toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Area:</span>
          <span className="info-value">{currentState.area.toLocaleString()} sq mi</span>
        </div>
      </div>

      <div className="fun-fact">
        <span className="fun-fact-label">Fun Fact:</span>
        <p>{currentState.funFact}</p>
      </div>
    </div>
  );
}

export default StatePanel;
