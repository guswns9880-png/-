import { useState } from "react";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState("");
  const [card, setCard] = useState("");
  const [amount, setAmount] = useState("");

  const addEntry = () => {
    if (!date || !card || !amount) return;
    setEntries([...entries, { date, card, amount: Number(amount) }]);
    setCard("");
    setAmount("");
  };

  const groupedByDate = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h1>입금 관리</h1>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br/><br/>
      <input placeholder="카드사" value={card} onChange={(e) => setCard(e.target.value)} /><br/><br/>
      <input type="number" placeholder="금액" value={amount} onChange={(e) => setAmount(e.target.value)} /><br/><br/>

      <button onClick={addEntry}>추가</button>

      <hr/>

      {Object.entries(groupedByDate).map(([date, items]) => {
        const total = items.reduce((sum, i) => sum + i.amount, 0);
        return (
          <div key={date}>
            <h3>{date}</h3>
            {items.map((item, idx) => (
              <div key={idx}>{item.card} : {item.amount}원</div>
            ))}
            <strong>합계: {total}원</strong>
          </div>
        );
      })}
    </div>
  );
}
