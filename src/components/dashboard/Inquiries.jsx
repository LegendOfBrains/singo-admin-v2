import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function Inquiries({ onItemClick }) {
  // 검색창에 입력한 값을 저장하는 상태
  const [searchTerm, setSearchTerm] = useState('');
  // 문의사항(질문) 목록을 저장하는 상태
  const [inquiries, setInquiries] = useState([]);

  // 컴포넌트가 처음 화면에 나타날 때 실행됨
  useEffect(() => {
    // 실제 서버에서 데이터를 받아오는 대신, 임시로 가짜 데이터 사용
    const mockData = [
      {
        id: 1,
        content: '급식 메뉴는 어떻게 결정되나요?',
        inquirer: '쇼타로',
        date: '2025.06.23',
        status: '답변 완료'
      },
      {
        id: 2,
        content: '체육복 구매는 어디서 하나요?',
        inquirer: '송은석',
        date: '2025.06.23',
        status: '답변 안함'
      },
      {
        id: 3,
        content: '학교 시설 이용 시간이 궁금합니다',
        inquirer: '정성찬',
        date: '2025.06.22',
        status: '답변 완료'
      },
      {
        id: 4,
        content: '방과후 수업 신청은 언제부터 가능한가요?',
        inquirer: '박원빈',
        date: '2025.06.22',
        status: '답변 안함'
      },
      {
        id: 5,
        content: '학교 앞 교통 안전에 대해 문의드립니다',
        inquirer: '이소희',
        date: '2025.06.21',
        status: '답변 완료'
      },
      {
        id: 6,
        content: '교복 수선은 어디서 받을 수 있나요?',
        inquirer: '이찬영',
        date: '2025.06.21',
        status: '답변 안함'
      }
    ];
    setInquiries(mockData); // 위의 가짜 데이터를 상태에 저장
  }, []);

  // 문의 상태(답변 완료/안함)에 따라 색깔을 다르게 보여주는 함수
  const getStatusColor = (status) => {
    switch (status) {
      case '답변 완료':
        return 'bg-green-100 text-green-800'; // 답변 완료는 초록색 배경
      case '답변 안함':
        return 'bg-red-100 text-red-800'; // 답변 안함은 빨간색 배경
      default:
        return 'bg-gray-100 text-gray-800'; // 그 외는 회색 배경
    }
  };

  // 검색어에 따라 문의사항을 필터링(검색)함
  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) || // 내용에 검색어가 포함되면
    inquiry.inquirer.toLowerCase().includes(searchTerm.toLowerCase())   // 문의자 이름에 검색어가 포함되면
  );

  return (
    <>
      {/* 상단: 제목과 검색창 */}
      <div className="flex justify-between items-center mb-8">
        {/* 큰 제목 */}
        <h1 className="text-3xl font-bold text-gray-900">문의사항</h1>
        {/* 검색창 */}
        <div className="relative">
          {/* 돋보기 아이콘 */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {/* 검색 입력창 */}
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력값이 바뀔 때마다 상태 변경
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 문의사항 목록 테이블(표) */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* 테이블 헤더(제목 줄) */}
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium">
            <div className="col-span-6">문의 내용</div>
            <div className="col-span-2">문의자</div>
            <div className="col-span-2">문의일</div>
            <div className="col-span-2">현황</div>
          </div>
        </div>

        {/* 문의사항 목록 */}
        <div className="divide-y divide-gray-200">
          {filteredInquiries.length > 0 ? (
            // 문의사항이 있을 때
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onItemClick && onItemClick(inquiry.id)} // 클릭하면 상세보기로 이동
              >
                {/* 문의 내용 */}
                <div className="col-span-6">
                  <p className="text-gray-900 truncate" title={inquiry.content}>
                    {inquiry.content}
                  </p>
                </div>
                {/* 문의자 이름 */}
                <div className="col-span-2">
                  <p className="text-gray-900">{inquiry.inquirer}</p>
                </div>
                {/* 문의 날짜 */}
                <div className="col-span-2">
                  <p className="text-gray-600">{inquiry.date}</p>
                </div>
                {/* 답변 상태 */}
                <div className="col-span-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            // 문의사항이 없을 때(검색 결과 없음)
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 하단: 문의 개수 표시 */}
      <div className="mt-6 flex justify-center">
        <div className="text-sm text-gray-500">
          총 {filteredInquiries.length}개의 문의가 있습니다.
        </div>
      </div>
    </>
  );
}