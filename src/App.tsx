import 'bulma/css/bulma.css';
import React, { useState } from 'react';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  default,
  alphabetically,
  length,
}

function sortedGoods(sortType: SortType, rev: boolean) {
  const sorted = [...goodsFromServer].sort(
    (itemOne: string, itemTwo: string) => {
      if (sortType === SortType.alphabetically) {
        return itemOne.localeCompare(itemTwo);
      }

      if (sortType === SortType.length) {
        return itemOne.length - itemTwo.length;
      }

      return 0;
    },
  );

  return rev ? sorted.reverse() : sorted;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [rev, setRev] = useState<boolean>(false);
  const visibleGoods = sortedGoods(sortType, rev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType !== SortType.alphabetically && 'is-light'
          }`}
          onClick={() => setSortType(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.length && 'is-light'}`}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!rev && 'is-light'}`}
          onClick={() => setRev(!rev)}
        >
          Reverse
        </button>

        {(sortType !== SortType.default || rev) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.default);
              setRev(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(visibleGood => (
            <li key={visibleGood} data-cy="Good">
              {visibleGood}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
