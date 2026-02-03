/*
=============================================================
TRANG WEB DU LỊCH VIỆT NAM - SCRIPT CHÍNH
=============================================================
Chức năng chính:
  1. Lưu trữ dữ liệu các khu du lịch nổi tiếng Việt Nam
  2. Hiển thị danh sách địa điểm dưới dạng card
  3. Cho phép tìm kiếm địa điểm theo từ khóa
  4. Hiển thị thông tin chi tiết và hình ảnh của địa điểm
  5. Lưu dữ liệu vào localStorage để truyền sang trang chi tiết

Các hàm chính:
  - hienThiCard(): Tạo và hiển thị các card địa điểm
  - timKiemDiaDiem(): Tìm kiếm địa điểm theo từ khóa
  - moDiaDiem(): Hiển thị thông tin chi tiết của địa điểm
  - dongThongTin(): Đóng cửa sổ thông tin
  - soThanhChu(): Chuyển đổi số thành chữ tiếng Việt
=============================================================
*/

// Hàm chuyển đổi số thành chữ tiếng Việt
function soThanhChu(num) {
    const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const teens = ['mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười năm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];
    const tens = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    const scale = ['', 'nghìn', 'triệu', 'tỷ'];
    
    if (num === 0) return 'không';
    if (num < 0) return 'âm ' + soThanhChu(-num);
    
    let str = '';
    let scaleIdx = 0;
    
    while (num > 0) {
        let chunk = num % 1000;
        if (chunk !== 0) {
            str = convertHundreds(chunk, ones, teens, tens) + (scale[scaleIdx] ? ' ' + scale[scaleIdx] : '') + ' ' + str;
        }
        num = Math.floor(num / 1000);
        scaleIdx++;
    }
    
    return str.trim();
}

function convertHundreds(num, ones, teens, tens) {
    let result = '';
    
    // Trăm
    let hundreds = Math.floor(num / 100);
    if (hundreds > 0) {
        result += ones[hundreds] + ' trăm ';
    }
    
    let remainder = num % 100;
    if (remainder >= 10 && remainder < 20) {
        result += teens[remainder - 10];
    } else {
        let ten = Math.floor(remainder / 10);
        let one = remainder % 10;
        if (ten > 0) {
            result += tens[ten];
            if (one > 0) {
                result += ' ' + ones[one];
            }
        } else if (one > 0) {
            result += ones[one];
        }
    }
    
    return result.trim();
}

// ===== DỮ LIỆU KHU DU LỊCH VIỆT NAM =====
// Lưu trữ thông tin chi tiết về các địa điểm du lịch
const diaDiemDuLich = {
    halong: {
        id: "halong",
        name: "Vịnh Hạ Long",
        ten: "Vịnh Hạ Long",
        image: "./image/du-lich-vinh-Ha-Long-hinh-anh3_1625912082_1661247765.webp",
        area: "Vịnh Hạ Long",
        description: "Vịnh Hạ Long được Unesco nhiều lần công nhận là Di sản thiên nhiên của Thế giới với hàng nghìn hòn đảo được làm nên bởi tạo hoá kỳ vĩ và sống động. Vịnh Hạ Long có phong cảnh tuyệt đẹp nên nơi đây là một điểm du lịch rất hấp dẫn với du khách trong nước và quốc tế. Mới đây nhất, ngày 16/9/2023, tại thủ đô Riyadh, Ả Rập Xê Út, UNESCO lại một lần nữa vinh danh và công nhận quần thể vịnh Hạ Long – quần đảo Cát Bà là Di sản thiên nhiên thế giới, bởi nơi đây chứa đựng các khu vực có vẻ đẹp thiên nhiên bao gồm các đảo đá vôi có thảm thực vật che phủ và các đỉnh nhọn núi đá vôi nhô lên trên mặt biển cùng với các đặc điểm karst liên quan như các mái vòm và hang động. Vịnh Hạ Long là một di sản độc đáo bởi địa danh này chứa đựng những dấu tích quan trọng trong quá trình hình thành và phát triển lịch sử trái đất, là cái nôi cư trú của người Việt cổ, đồng thời là tác phẩm nghệ thuật tạo hình vĩ đại của thiên nhiên với sự hiện diện của hàng nghìn đảo đá muôn hình vạn trạng, với nhiều hang động kỳ thú quần tụ thành một thế giới vừa sinh động vừa huyền bí. Bên cạnh đó, vịnh Hạ Long còn là nơi tập trung đa dạng sinh học cao với những hệ sinh thái điển hình cùng với hàng nghìn loài động thực vật vô cùng phong phú, đa dạng. Nơi đây còn gắn liền với những giá trị văn hóa – lịch sử hào hùng của dân tộc.",
        hinhAnh: [
            "./image/du-lich-viet-nam-ha-long_1740037141.jpg",
            "./image/007_Rs.jpg",
            "./image/anh-hoang-hon-vinh-ha-long_115608289.jpg"
        ]
    },

    Hue: {
        id: "Hue",
        name: "Huế",
        ten: "Huế",
        image: "./image/huế_1661248551.jpg",
        area: "Thừa Thiên Huế",
        description: "Huế, thành phố di sản văn hóa thế giới, luôn là điểm đến quyến rũ du khách bởi bề dày lịch sử, kiến trúc cổ kính và nền ẩm thực tinh tế. Nằm dịu dàng trên dải đất miền Trung, Cố đô Huế ẩn chứa những giá trị và bản sắc độc đáo, chờ đợi du khách thập phương khám phá. Bài viết này sẽ cung cấp một cái nhìn toàn diện về du lịch Huế, từ thời điểm lý tưởng để ghé thăm, cách di chuyển thuận tiện, lựa chọn nơi ở, đến những địa điểm tham quan không thể bỏ lỡ và những trải nghiệm ẩm thực độc đáo. Dù bạn là người lần đầu đến Huế hay đã từng ghé thăm, những thông tin chi tiết dưới đây sẽ giúp bạn có một hành trình trọn vẹn và ý nghĩa. Hãy cùng nhau lên kế hoạch cho chuyến du lịch Cố Đô Huế đầy thú vị.",
        hinhAnh: [
            "./image/kinh-thanh-2hue-.jpg",
            "./image/du-lich-hue-3-ngay-2-dem-7.jpg",
            "./image/OWpyp4tN-check-in-hue-banner.jpg"
        ]
    },

    danang: {
        id: "danang",
        name: "Đà Nẵng",
        ten: "Đà Nẵng",
        image: "./image/dia-diem-du-lich-tai-da-nang.jpg",
        area: "Đà Nẵng",
        description: "Với vị trí là một trong ba trung tâm du lịch lớn trên bản đồ du lịch Việt Nam, Đà Nẵng thành phố biển xinh đẹp hiền hòa và mếm khách, nơi mà bạn có thể dễ dàng đến được bằng cả đường bộ, đường hàng không và đường thủy. Một dấu ấn địa lý và lịch sử, điểm trung chuyển tiện lợi đến các di sản văn hóa thế giới như Huế, Mỹ Sơn, Hội An và khu dự trữ sinh quyển thế giới Cù Lao Chàm. Qua năm tháng Đà Nẵng đang càng khẳng định là một điểm đến hấp dẫn và lý tưởng đối với bàn bè và du khách năm châu. Bạn sẽ đi từ ngạc nhiên này đến ngạc nhiên khác trong hành trình khám phá các di tích văn hóa, lịch sử, danh lam thắng cảnh, đèo Hải Vân – Thiên hạ đệ nhất hùng quang, Ngũ Hành Sơn thuyền thoại, đến dải bờ biển tuyệt đẹp được tôn vinh là một trong sáu bải biển đẹp nhất hành tinh. Hơn thế nữa Đà Nẵng là nơi bạn có thể thưởng thức dịch vụ nghỉ dưỡng đạt chuẩn quốc tế với các thương hiệu nổi tiếng thế giới như Intercontinental, Novotel, Crowne Plaza, Furama… Tham gia những hành trình khám phá thiên nhiên phong phú và cảm nhận sâu sắc về đời sống và văn hóa bản địa. Đà Nẵng được xem là điểm trung chuyển quan trọng trên con đường di sản miền Trung, thành phố Đà Nẵng được bao bọc bởi 3 di sản văn hóa thế giới: Huế, Hội An, Mỹ Sơn. Xa hơn một chút nữa là di sản thiên nhiên thế giới Vườn Quốc gia Phong Nha – Kẻ Bàng và Động Thiên Đường. Chính vị trí này đã làm nổi rõ vai trò của thành phố Đà nẵng trong khu vực, đó là nơi đón tiếp, phục vụ, trung chuyển khách.",
        hinhAnh: [
            "./image/top-15-cac-dia-diem-du-lich-da-nang-hot-nhat-ban-khong-the-bo-qua-5ed9cb9e48845.jpg",
            "./image/dia-diem-du-lich-tai-da-nang.jpg",
            "./image/hinh-anh-thanh-pho-da-nang-ve-dem-dep_024513140.jpg"
        ]
    },

    hoian: {
        id: "hoian",
        name: "Hội An",
        ten: "Hội An",
        image: "./image/220427677-1651553439048.png",
        area: "Hội An",
        description: "Sự hình thành của phố cổ Hội An gắn liền với giai đoạn phát triển rực rỡ của con đường tơ lụa và gốm sứ trên biển từ thế kỷ 16 đến thế kỷ 19. Nằm ở hạ lưu sông Thu Bồn, nơi đây từng là thương cảng quốc tế sầm uất, nơi các đội tàu buôn từ Nhật Bản, Trung Hoa và phương Tây dừng chân trao đổi hàng hóa. Hệ thống di tích tại phố cổ Hội An được bảo tồn gần như nguyên vẹn với hơn 1.000 di tích kiến trúc từ đường xá, nhà cửa, hội quán đến đình, chùa, miếu mạo. Mỗi công trình là một tác phẩm nghệ thuật chạm khắc tinh xảo, thể hiện sự khéo léo và tư duy thẩm mỹ vượt trội của các bậc tiền nhân. Giá trị của phố cổ Hội An đã được UNESCO ghi danh vào danh mục Di sản Văn hóa Thế giới vào năm 1999 nhờ sự kết hợp độc đáo giữa các phong cách kiến trúc qua nhiều thời kỳ. Sự bảo tồn nghiêm ngặt của chính quyền và ý thức của người dân đã giúp bảo tàng sống này duy trì sức hút mãnh liệt đối với bạn bè quốc tế. ",
        hinhAnh: [
            "./image/du-lich-hoi-an-mua-nao-dep-nhat-1.jpg",
            "./image/unnamed.jpg",
            "./image/hoi-an-1680591517857660432696.webp"
        ]
    },

    nhatrang: {
        id: "nhatrang",
        name: "Nha Trang",
        ten: "Nha Trang",
        image: "./image/tp-nha-trang-16818161974101240202452.webp",
        area: "Nha Trang",
        description: "Nha Trang, Khánh Hòa là nơi mà mỗi lần nhắc đến là lòng lại gợi lên hình ảnh của biển xanh ngút ngàn, nắng vàng trải lối và nhịp sống thong dong như thể thời gian cũng muốn chậm. Nha Trang sở hữu đường bờ biển dài với làn nước trong xanh và hàng chục hòn đảo lớn nhỏ nguyên sơ.  Nơi đây là điểm đến lý tưởng cho những ai yêu thích văn hóa - lịch sử miền Trung cũng như khám phá các thắng cảnh trữ tình, nhẹ nhàng nhưng không kém phần quyến rũ. Du lịch Nha Trang không chỉ là hành trình để ngắm nhìn mà còn là chuyến đi để cảm nhận. Cảm nhận sự tinh khôi của buổi sớm trên bờ biển, hương vị đậm đà của những món ăn thấm đầy vị biển, và nụ cười thân thiện của người dân địa phương. Tất cả hòa quyện, tạo nên một bức tranh sống động nhưng vẫn đầy chất thơ.",
        hinhAnh: [
            "./image/Vinwonders-nha-trang.jpg",
            "./image/tour-nha-trang--vinwonders-3n3d20311.png",
            "./image/a1acf82403f843389d7d955048d7fc72_af4a1d084a3442beaad93bb1868207ad_image.webp"
        ]
    },

    sapa: {
        id: "sapa",
        name: "Sapa",
        ten: "Sapa",
        image: "./image/dia-diem-du-lich-sapa-2.png",
        area: "Sapa",
        description: "Sa Pa là một điểm du lịch cách trung tâm thành phố Lào Cai khoảng hơn 30 km. Nằm ở độ cao trung bình 1500 – 1800 m so với mặt nước biển, Thị Trấn Sapa luôn chìm trong làn mây bồng bềnh, tạo nên một bức tranh huyền ảo đẹp đến kỳ lạ. Nơi đây, có thứ tài nguyên vô giá đó là khí hậu quanh năm trong lành mát mẻ, với nhiệt độ trung bình 15-18°C. Khách du lịch đến đây không chỉ để tận hưởng không khí trong lành, sự yên bình giản dị của một vùng đất phía Tây Bắc, mà Sapa còn là điểm đến để bạn chiêm ngưỡng những vẻ đẹp hoang sơ của những ruộng bậc thang, thác nước, những ngọn vúi hùng vĩ, khám phá những phong tục tập quán, nét đẹp văn hóa của các dân tộc trên núi như : H’Mong đen, Dzao đỏ, Tày, Dzáy…",
        hinhAnh: [
            "./image/dia-diem-du-lich-sapa-1.png",
            "./image/1740370327.webp",
            "./image/sapa-nam-trong-danh-sach-nhung-thi-tran-nho-dep-nhat-the-gioi-070424842-5567_20230512161256.jpg",
            "https://via.placeholder.com/400x400/228B22/ffffff?text=Sapa+1",
            "https://via.placeholder.com/400x400/2E8B57/ffffff?text=Sapa+2",
            "https://via.placeholder.com/400x400/1F7A2B/ffffff?text=Sapa+3"
        ]
    },

    vungtau: {
        id: "vungtau",
        name: "Vũng Tàu",
        ten: "Vũng Tàu",
        image: "./image/tuong-chua-kito-vua-vung-tau.jpg",
        area: "Vũng Tàu",
        description: "Vũng Tàu là một trong những điểm du lịch biển hấp dẫn nhất ở miền Nam Việt Nam, cách TP.HCM khoảng 125km. Thành phố nổi bật với những bãi biển đẹp như Bãi Sau, Bãi Trước, Hồ Tràm, Hồ Cốc, cùng với các địa điểm tham quan nổi tiếng như Tượng Chúa Kitô Vua, Mũi Nghinh Phong, Hải đăng Vũng Tàu. Ngoài ra, du khách có thể trải nghiệm không gian thiên nhiên tại Hồ Mây, Đồi Con Heo, Suối Đá – Suối Tiên. Vũng Tàu còn hấp dẫn bởi ẩm thực phong phú với các món hải sản tươi ngon, bánh khọt trứ danh. Với khí hậu ôn hòa, cảnh đẹp đa dạng và nhiều hoạt động giải trí, Vũng Tàu là điểm đến lý tưởng cho du lịch nghỉ dưỡng và khám phá. Đặc biệt, sự phát triển không ngừng của hạ tầng du lịch cùng sự xuất hiện của nhiều địa điểm mới lạ, độc đáo đã khiến thành phố này trở thành điểm đến lý tưởng cho cả những chuyến đi ngắn ngày hay những kỳ nghỉ dài hơn.",
        hinhAnh: [
            "./image/diem-danh-20-dia-diem-du-lich-vung-tau-doc-la-di-la-ghien-202309291647250644.jpg",
            "./image/du-lich-ba-ria-vung-tau-cam-nang-du-lich-va-16-dia-diem-dep-hap-dan-202310211058227735.jpg",
            "./image/1741497950.webp"
        ]
    },

    dalat: {
        id: "dalat",
        name: "Đà Lạt",
        ten: "Đà Lạt",
        image: "./image/chiem-bai-va-trai-nghiem-nhung-hoat-dong-thu-vi-tai-samten-hills-dalat.webp",
        area: "Đà Lạt",
        description: "Đà Lạt, thành phố ngàn hoa với khí hậu mát mẻ quanh năm và cảnh sắc thiên nhiên thơ mộng, luôn là điểm đến hấp dẫn bậc nhất trong lòng du khách Việt. Nơi đây không chỉ nổi tiếng với những đồi thông reo vi vu, những hồ nước trong xanh hay những con đường quanh co lãng mạn, mà còn sở hữu vô vàn các khu du lịch ở Đà Lạt độc đáo, từ cổ kính đến hiện đại, từ thiên nhiên hùng vĩ đến những không gian check-in đầy sáng tạo. Mỗi khu du lịch lại mang một nét quyến rũ riêng, hứa hẹn đem lại những trải nghiệm đáng nhớ và cảm xúc khó quên cho bất kỳ ai đặt chân đến. Việc khám phá các khu du lịch ở Đà Lạt là một hành trình đa sắc màu, đưa bạn từ vẻ đẹp bình yên của những đồi chè xanh mướt, sự hùng vĩ của những ngọn thác, đến nét kiến trúc cổ kính trầm mặc và không gian tâm linh thanh tịnh. Thành phố này luôn biết cách làm mới mình với những điểm đến “hot” cập nhật, đồng thời giữ gìn những giá trị văn hóa, lịch sử đã làm nên tên tuổi. Cho dù bạn là người yêu thiên nhiên, đam mê lịch sử, thích khám phá những điều mới lạ, hay đơn giản chỉ muốn tìm một nơi chốn yên bình để “chữa lành”, Đà Lạt đều có thể đáp ứng. Bài viết này sẽ là cẩm nang toàn diện, dẫn lối bạn đến với những khu du lịch ở Đà Lạt tuyệt vời nhất trong năm 2025, cùng với những kinh nghiệm du lịch hữu ích để chuyến đi của bạn thêm phần trọn vẹn và đáng nhớ.",
        hinhAnh: [
            "./image/tham-quan-cac-diem-du-lich-da-lat-noi-tieng-trong-trung-tam-thanh-pho.webp",
            "./image/anh-da-lat.jpg",
            "./image/anh-da-lat-1.jpg"
        ]
    },

    phuquoc: {
        id: "phuquoc",
        name: "Phú Quốc",
        ten: "Phú Quốc",
        image: "./image/du-lich-phu-quoc-thang-4-22.webp",
        area: "Phú Quốc",
        description: "Du lịch Phú Quốc hấp dẫn du khách bởi sự hài hòa hiếm có, vừa đủ hoang sơ để người lữ khách tìm thấy sự bình yên, nhưng cũng vừa đủ hiện đại để tận hưởng mọi tiện nghi đẳng cấp nhất. Phú Quốc sở hữu hệ sinh thái đáng kinh ngạc với 22 hòn đảo lớn nhỏ xanh mướt, các siêu tổ hợp giải trí rộng đến hơn 1.000 ha, vô vàn khách sạn, resort 5 sao, nhà nghỉ bình dân,... Dù là địa điểm du lịch nổi tiếng toàn cầu nhưng giá cả ở Phú Quốc lại không đắt đỏ như nhiều người nghĩ, trái lại mọi chi phí dịch vụ, hàng hóa tại đây rất đa dạng từ bình dân đến cao cấp. Đặc biệt, Phú Quốc còn nhận được sự ưu ái từ khí hậu khi chia thành 2 mùa rõ rệt: mùa mưa và mùa khô. Trong đó, thời điểm vàng để du lịch Phú Quốc là mùa khô từ tháng 11 đến tháng 4, nắng vàng ươm, nước biển trong vắt, nhiệt độ hiền hòa khoảng 27°C. Trái lại, mùa mưa từ tháng 5 đến đầu tháng 10 lại mang đến những cơn mưa rào bất chợt, có khi là đỉnh điểm mưa bão vào tháng 8 - tháng 9. Tuy nhiên, mùa mưa lại mang đến tiết trời mát mẻ, không gian yên tĩnh hơn, tránh đông đúc, chi phí cũng rẻ hơn rất nhiều.",
        hinhAnh: [
            "./image/vinwonders-phu-quoc-dia-diem-du-lich-phu-quoc.jpg",
            "./image/810f97d8-choi-gi-o-phu-quoc-5.jpg",
            "./image/6c0fb7e4-canh-dep-phu-quoc-24.jpg"
        ]
    },

    phuquy: {
        id: "phuquy",
        name: "Phú Quý",
        ten: "Phú Quý",
        image: "./image/shutterstock597812177huge1-1679385132078.jpg",
        area: "Phú Quý",
        description: "Đảo Phú Quý là đảo nhỏ tọa lạc cách thành phố Phan Thiết cũ – một trong những điểm du lịch nổi tiếng của Việt Nam – khoảng 120km về phía Đông. Với diện tích khoảng 17 km2, đảo Phú Quý tỏa sáng với vẻ đẹp tự nhiên hùng vĩ, văn hóa đặc trưng và lòng hiếu khách của người dân địa phương. Nếu bạn là một fan của bộ phim Hàn Quốc “Hometown cha cha cha” và đam mê khung cảnh làng chài lãng mạn, nơi cô nha sĩ xinh đẹp Yoon Hye Jin say mê anh chàng Du Sik, thì đảo Phú Quý sẽ là một phiên bản hoàn hảo của Gongjin để bạn thỏa mãn tình yêu và hồi ức của mình. Với vẻ đẹp bình yên và thôn quê, đảo Phú Quý mang đến không gian lãng mạn và thư thái, giống như một tác phẩm truyền hình thực tế mà bạn sẽ muốn thả mình vào. Đảo Phú Quý được mệnh danh là “tiểu Bali” của Việt Nam, với đặc điểm nổi bật là 3 ngọn núi chính gồm núi Cấm, núi Cao Cát và núi Ông Đụn. Bên cạnh những ngọn núi độc đáo này, đảo còn hấp dẫn du khách bởi sự đa dạng của các di tích lịch sử, danh lam thắng cảnh hiếm thấy.",
        hinhAnh: [
            "./image/Cot-co-Phu-Quy-2.jpg",
            "./image/du-lich-dao-phu-quy-ivivu.jpg",
            "./image/Dao-Phu-Quy-1.jpg"
        ]
    },

    caobang: {
        id: "caobang",
        name: "Cao Bằng",
        ten: "Cao Bằng",
        image: "./image/ef583339-1a53-4f4e-a803-6b3069bbe5a0.jpg",
        area: "Cao Bằng",
        description: "Cao Bằng là vùng đất cổ xưa, nơi sinh sống của 8 dân tộc: Tày, Nùng, Mông, Kinh, Dao, Sán Chỉ, Hoa, Lô Lô. Nơi đây được xem là một trong những trung tâm của bộ tộc người Tày cổ; miền đất Cao Bằng được xem là “cái nôi” của cách mạng Việt Nam. Ngoài ra, còn nhiều di tích văn hóa, lịch sử, khảo cổ, đa dạng sinh học cùng hàng trăm di sản văn hóa vật thể và phi vật thể khác. Nằm giữa vùng Đông Bắc với thiên nhiên phong phú, đa dạng, Cao Bằng được ví như “viên ngọc xanh” lộng lẫy, lung linh. Tài nguyên thiên nhiên dồi dào với vô số cảnh đẹp tự nhiên và di tích lịch sử lâu đời, ngày càng nhiều người biết đến Cao Bằng và chọn nơi đây là địa điểm để dừng chân, thăm thú. Chính vì vậy, các địa điểm du lịch ở Cao Bằng ngày càng nổi tiếng và được đầu tư phát triển hơn. Đến Cao Bằng, du khách có thể trải nghiệm nhiều loại hình du lịch khác nhau với nhiều khu du lịch sinh thái, nhiều danh thắng, vườn quốc gia, khu bảo tồn độc đáo. Phong cảnh đẹp, động thực vật phong phú, nền văn hóa đặc trưng,… là những điều níu chân du khách mỗi khi đến các địa điểm du lịch Cao Bằng.",
        hinhAnh: [
            "./image/dia-diem-du-lich-cao-bang-1.webp",
            "./image/cao-bang-241.jpg",
            "./image/du-lich-cao-bang-2.webp"
        ]
    },

    haiphong: {
        id: "haiphong",
        name: "Hải Phòng",
        ten: "Hải Phòng",
        image: "./image/diem-qua-15-dia-diem-du-lich-dep-me-man-tai-hai-phong-ban-nhat-dinh-phai-den-202203261101313927.jpg",
        area: "Hải Phòng",
        description: "Hải Phòng chiếm giữ sức hút rất riêng trong các điểm đến nổi tiếng miền Bắc. Thành phố cảng luôn mang đến cho du khách muôn phương những cảm nhận thú vị về thiên nhiên, kiến trúc và ẩm thực. Nằm ở vị trí trung tâm Duyên hải Bắc Bộ, Hải Phòng là thành phố cảng lâu đời và là trung tâm du lịch biển hàng đầu cả nước. Hải Phòng là tỉnh thành hiếm hoi hội tụ 5 loại hình giao thông được kết nối đồng bộ là: đường biển, đường hàng không, đường sắt, đường bộ và đường sông. Sức hút của du lịch Hải Phòng còn đến từ cảnh quan thiên nhiên đa dạng với nhiều danh thắng nổi tiếng như: biển Đồ Sơn, quần đảo Cát Bà, vịnh Lan Hạ, đảo Hòn Dấu, núi Voi… Đặc biệt, Hải Phòng còn được biết đến với sản phẩm du lịch đa dạng, trở thành xu hướng thu hút giới trẻ như: food tour, city tour, trải nghiệm xe đạp công cộng… Thành phố hoa phượng đỏ còn là điểm đến hấp dẫn cho hành trình du lịch văn hóa, tâm linh với không gian lễ hội đặc sắc và nhiều di tích lịch sử lâu đời.",
        hinhAnh: [
            "./image/den-dat-cang-dung-bo-qua-top-18-diem-du-lich-hai-phong-tuyet-dep-phan-1-5-1647973371.jpg",
            "./image/hon-dau-resort-60d41003093a2-2.jpg",
            "./image/anh-dep-hai-phong-1.jpg"
        ]
    }
};

// ===== HIỂN THỊ DANH SÁCH KHU DU LỊCH =====
// Lấy phần tử container để hiển thị các card
const hopThe = document.getElementById("hop-the");

// Hàm hiển thị card các địa điểm du lịch
function hienThiCard(danhSachDiaDiem) {
    hopThe.innerHTML = "";
    Object.values(danhSachDiaDiem).forEach(location => {
        const card = document.createElement("div");
        card.classList.add("the");

        card.innerHTML = `
            <img src="${location.image}" alt="${location.name}">
            <h2>${location.name}</h2>
            <p>Khu vực: ${location.area}</p>
        `;

        card.addEventListener("click", () => {
            localStorage.setItem("dulieuTrangChu", JSON.stringify(location));
            window.location.href = "chitiet.html";
        });

        hopThe.appendChild(card);
    });
}

// Hiển thị tất cả card khi load trang
hienThiCard(diaDiemDuLich);

// ===== CHỨC NĂNG TÌM KIẾM =====
// Tìm kiếm địa điểm du lịch theo từ khóa (tên, khu vực, mô tả)
const dauVaoTimKiem = document.getElementById("dau-vao-tim-kiem");
const nutTimKiem = document.getElementById("nut-tim-kiem");

// Hàm loại bỏ dấu tiếng Việt (diacritic)
function boiDau(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

// Hàm tìm kiếm: so sánh từ khóa với tên, khu vực và mô tả
// Hỗ trợ tìm kiếm với một chữ hoặc nhiều chữ (ví dụ: "p" tìm phú quốc, phú quý; "h" tìm hội an, hải phòng)
function timKiemDiaDiem(tuKhoa) {
    const ketQua = {};
    const tuKhoaBoDau = boiDau(tuKhoa);

    // Nếu từ khóa rỗng, trả về toàn bộ danh sách
    if (!tuKhoaBoDau || tuKhoaBoDau.trim() === "") {
        return diaDiemDuLich;
    }

    Object.keys(diaDiemDuLich).forEach(key => {
        const location = diaDiemDuLich[key];
        const intro = location.gioiThieu || location.description || "";
        
        // Loại bỏ dấu từ các trường để so sánh
        const nameBoDau = boiDau(location.name);
        const areaBoDau = boiDau(location.area);
        const introBoDau = boiDau(intro);
        
        // Tìm kiếm: nếu từ khóa (1 chữ hoặc nhiều chữ) khớp với bất kỳ trường nào
        if (nameBoDau.includes(tuKhoaBoDau) ||
            areaBoDau.includes(tuKhoaBoDau) ||
            introBoDau.includes(tuKhoaBoDau)) {
            ketQua[key] = location;
        }
    });

    return ketQua;
}

// Xử lý sự kiện khi bấm nút tìm kiếm
nutTimKiem.addEventListener("click", () => {
    thucHienTimKiem();
});

// Hàm thực hiện tìm kiếm
function thucHienTimKiem() {
    const tuKhoa = dauVaoTimKiem.value.trim();
    
    if (tuKhoa === "") {
        // Nếu input rỗng, hiển thị toàn bộ 12 địa điểm
        hienThiCard(diaDiemDuLich);
        return;
    }
    
    const ketQua = timKiemDiaDiem(tuKhoa);
    
    if (Object.keys(ketQua).length === 0) {
        // Hiển thị thông báo lỗi khi không có kết quả
        hopThe.innerHTML = "<p style='text-align: center; color: #ff6b6b; font-size: 18px; font-weight: bold; padding: 40px 20px;'>❌ Không tìm thấy địa điểm nào phù hợp</p>";
    } else {
        // Hiển thị kết quả tìm kiếm
        hienThiCard(ketQua);
    }
}

// Tìm kiếm khi nhấn phím Enter trong ô tìm kiếm
dauVaoTimKiem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        thucHienTimKiem();
    }
});

// Tìm kiếm theo thời gian thực khi người dùng gõ (live search)
// Đây là tính năng tự động tìm kiếm khi đang gõ
dauVaoTimKiem.addEventListener("input", () => {
    // Tìm kiếm theo thời gian thực nếu người dùng muốn
    // Uncomment dòng dưới để bật tìm kiếm theo thời gian thực
    // thucHienTimKiem();
});

// Reset tìm kiếm khi xóa text
dauVaoTimKiem.addEventListener("keydown", (e) => {
    // Khi nhấn Delete hoặc Backspace
    if (e.key === "Delete" || e.key === "Backspace") {
        // Delay một chút để cho input update xong
        setTimeout(() => {
            if (dauVaoTimKiem.value.trim() === "") {
                hienThiCard(diaDiemDuLich);
            }
        }, 10);
    }
});

// ===== HIỂN THỊ THÔNG TIN CHI TIẾT =====
// Mở cửa sổ hiển thị ảnh và mô tả chi tiết của địa điểm
function moDiaDiem(maDiaDiem) {
    const diaDiem = diaDiemDuLich[maDiaDiem];

    // Cập nhật tên và mô tả
    document.getElementById("ten-dia-diem").innerText = diaDiem.ten;
    document.getElementById("mo-ta").innerText = diaDiem.description;

    // Hiển thị thư viện ảnh
    const thuVienAnh = document.getElementById("thu-vien-anh");
    thuVienAnh.innerHTML = "";

    diaDiem.hinhAnh.forEach(link => {
        const anh = document.createElement("img");
        anh.src = link;
        thuVienAnh.appendChild(anh);
    });

    // Hiển thị cửa sổ thông tin
    document.getElementById("hop-thong-tin").style.display = "block";
}

// Đóng cửa sổ hiển thị thông tin
function dongThongTin() {
    document.getElementById("hop-thong-tin").style.display = "none";
}

