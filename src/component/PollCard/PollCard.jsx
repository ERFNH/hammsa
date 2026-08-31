import Glassybackground from "../Glassybackground/Glassybackground";
import OptionList from "../Optionlist/Optionlist";
import styles from "./PollCard.module.css";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { postVote, getMyvote } from "../../api/auth";
import "../../global.css"
function PollCard({ pollId, title, description, options = [] }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [myVote, setMyVote] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMyVote = async () => {
      try {
        const res = await getMyvote(id);
        if (res.data) {
          setMyVote(res.data);
          setSelectedOption(res.data.optionId);
          setVoted(true);
        }
      } catch (error) {
        console.log("کاربر رای نداده است");
      } finally {
        setLoading(false);
      }
    };
    fetchMyVote();
  }, [pollId]);
  const handleVote = async () => {
    if (!pollId) {
      alert("شناسه رای‌گیری یافت نشد");
      return;
    }
    if (!selectedOption) {
      alert("لطفاً یک گزینه را انتخاب کنید");
      return;
    }
    setVoting(true);
    try {
      console.log("در حال ارسال:", {
        pollId: pollId,
        optionId: selectedOption,
      });
      await postVote(pollId, selectedOption);
      setVoted(true);
      setMyVote({ optionId: selectedOption });
      alert("رای شما با موفقیت ثبت شد");
    } catch (error) {
      console.error("خطا در ثبت رای:", error);
      console.error("خطای کامل سرور:", error.response?.data);
      alert("خطا در ثبت رای");
    } finally {
      setVoting(false);
    }
  };
  const calculatePercentage = (optionId) => {
    const totalVotes = options.reduce(
      (sum, opt) => sum + (opt.voteCount || 0),
      0,
    );
    if (totalVotes === 0) return 0;
    const option = options.find((opt) => opt.pollId === optionId);
    return Math.round(((option?.voteCount || 0) / totalVotes) * 100);
  };
  return (
    <main className={styles.pollCard}>
      <Glassybackground>
        <div className={styles.insidecarg}>
          <div className={styles.discrtgroup}>
            <div className={styles.discrt}>
              <span>عنوان:</span>
              <div className={`${styles.value} backgroundcolor`}>{title || "بدون عنوان"}</div>
            </div>
            <div className={styles.discrt}>
              <span>توضیحات:</span>
              <div className={`${styles.value} ${styles.valuebackground} hide-scrollbar backgroundcolor`}>
                {description || "بدون توضیحات"}
              </div>
            </div>
          </div>
          {options.length > 0 && (
            <div className={styles.options}>
              <OptionList
                options={options}
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
                disabled={voted}
                showPercentage={voted}
                myVoteId={myVote?.optionId}
                calculatePercentage={calculatePercentage}
              />
            </div>
          )}
          {!voted && (
            <Button
              type="button"
              className="simplebutton-wh"
              onClick={handleVote}
              disabled={voting || !selectedOption}
            >
              ثبت رای
            </Button>
          )}
          {voted && <p className={styles.votedText}> رای شما ثبت شد</p>}
        </div>
      </Glassybackground>
    </main>
  );
}
export default PollCard;
