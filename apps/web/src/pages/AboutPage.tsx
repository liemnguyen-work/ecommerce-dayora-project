
import { Link } from 'react-router-dom'
import CatalogLayout from '../components/catalog/CatalogLayout'
import { Rise } from '../components/home/HomeMotion'
import { FaqItem } from '../components/home/FaqItem'
import { faqs } from '../components/home/faqs'
const promises = [
  {
    title: 'Vừa đủ cho chuyến đi',
    text: 'DAYORA hướng đến việc gợi ý các món đồ theo loại chuyến đi và số lượng người tham gia, giúp khách hàng tránh mua sắm dư thừa.',
  },
  {
    title: 'Giá minh bạch',
    text: 'Giá sản phẩm, voucher và phí vận chuyển được hướng đến hiển thị rõ ràng theo lựa chọn thực tế của khách hàng.',
  },
  {
    title: 'Tự do đổi món',
    text: 'Khách hàng có thể chủ động thay đổi mẫu mã và số lượng để bộ sản phẩm phù hợp với nhu cầu cá nhân.',
  },
]

const team: [string, string][] = [
  ['Liêm', 'Trưởng nhóm, phân tích yêu cầu'],
  ['Đạt', 'Thiết kế sản phẩm UI/UX'],
  ['Thành', 'Frontend khách hàng'],
  ['Phúc', 'Frontend quản trị'],
  ['Hoàn', 'Backend giao dịch'],
  ['Châu', 'Backend dữ liệu và quản trị'],
  ['Ngọc', 'Kiểm thử chất lượng'],
  ['Kiệt', 'DevOps và triển khai'],
]
export default function AboutPage() {
  return (
    <CatalogLayout title="Về chúng tôi">
      {/* 1. Mở đầu: logo và tiêu đề */}
 <Rise>
<section className="about-hero">
  <img
    src="/brand/logo-badge-480.png"
    alt="Logo DAYORA"
    className="about-logo"
  />

  <p className="about-eyebrow">
    Chào mừng bạn đến với DAYORA
  </p>

  <h1>
    Gói trọn cuộc vui,
    <span className="mark"> mở trọn hành trình</span>
  </h1>

  <p>
    DAYORA đồng hành cùng bạn trong những chuyến đi,
    từ picnic, hẹn hò đến những ngày khám phá biển.
  </p>
</section>
</Rise>
      {/* 2. Câu chuyện thương hiệu */}


<Rise>
  <section className="about-split">
    <div className="about-story-image">
      <img
        src="/home/story-3.jpg"
        alt="Không gian dã ngoại cùng DAYORA"
        loading="lazy"
      />
    </div>

    <div className="about-story-content">
      <p className="about-eyebrow">
        Câu chuyện của chúng tôi
      </p>

      <h2>
        Mỗi chuyến đi đều xứng đáng có những
        khoảnh khắc đáng nhớ
      </h2>

      <p>
        DAYORA được xây dựng với mong muốn giúp mọi người
        chuẩn bị những chuyến đi trong ngày một cách
        đơn giản, tiện lợi và chủ động hơn.
      </p>

      <p>
        Dù là một buổi picnic cùng bạn bè,
        một buổi hẹn hò hay chuyến đi biển,
        DAYORA hướng đến việc giúp bạn lựa chọn
        đúng những món đồ cần thiết cho hành trình.
      </p>

      <Link to="/tao-bo" className="btn btn-berry">
        Tạo bộ cho chuyến đi
      </Link>
    </div>
  </section>
</Rise>

      {/* 3. Ba lời hứa thương hiệu */}


<Rise>
  <section className="about-promises">
    <p className="about-eyebrow">
      Cam kết của DAYORA
    </p>

    <h2>Ba lời hứa thương hiệu</h2>

    <div className="promise-grid">
      {promises.map((promise) => (
        <article
          className="promise-card"
          key={promise.title}
        >
          <h3>{promise.title}</h3>
          <p>{promise.text}</p>
        </article>
      ))}
    </div>
  </section>
</Rise>

      {/* 4. Đội ngũ DAYORA */}


<Rise>
  <section className="about-team">
    <p className="about-eyebrow">
      Đội ngũ DAYORA
    </p>

    <h2>Những người đứng sau DAYORA</h2>

    <div className="team-grid">
      {team.map(([name, role]) => (
        <article className="team-card" key={name}>
          <div className="team-avatar" aria-hidden="true">
            {name.charAt(0)}
          </div>

          <h3>{name}</h3>
          <p>{role}</p>
        </article>
      ))}
    </div>
  </section>
</Rise>

      {/* 5. Câu hỏi thường gặp */}


<Rise>
  <section className="about-faq">
    <p className="about-eyebrow">
      Giải đáp thắc mắc
    </p>

    <h2>Câu hỏi thường gặp</h2>

    <div className="about-faq-list">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} {...faq} />
      ))}
    </div>
  </section>
</Rise>
        </CatalogLayout>
  )
}
