import React from 'react';
import { useTable } from 'react-table';
import { useState } from 'react';
import { useEffect } from 'react';

function Table()
{
    const columns = React.useMemo(() => [
        {
          Header: 'PRICEID',
          accessor: 'PriceID',
        },
        {
          Header: 'TICKER',
          accessor: 'Ticker',
        },
        {
          Header: 'VOLUME',
          accessor: 'Volume',
        },
        {
          Header: 'OPEN',
          accessor: 'Open',
        },
        {
          Header: 'CLOSE',
          accessor: 'Close',
        }
      ], []);

    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data-api/rest/Stocks')
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setStocks(data.value);
        })
        .catch((error) => {
            setError(error);
            console.error('Error fetching data:', error);
        });
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: stocks });
    
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                    </tr>
                    );
                })}
                </tbody>
            </table>
            <div>
            <h1>Stocks</h1>
            <ul>
                {stocks.map((stock) => (
                <li key={stock.PriceID}>
                    <p><strong>Ticker:</strong> {stock.Ticker}</p>
                    <p><strong>Volume:</strong> {stock.Volume}</p>
                    <p><strong>Open:</strong> {stock.Open}</p>
                    <p><strong>Close:</strong> {stock.Close}</p>
                    <hr />
                </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default Table;