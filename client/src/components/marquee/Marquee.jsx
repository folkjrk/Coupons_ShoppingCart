import MarqueeText from "react-marquee-text"
import './Marquee.css'

function MarqueeTextComponent() {
  return (
    <MarqueeText textSpacing={'5em'} className="marquee-text">
      Don't Miss Out – Enjoy Our Special Discount Coupon!
    </MarqueeText>
  )
}

export default MarqueeTextComponent;