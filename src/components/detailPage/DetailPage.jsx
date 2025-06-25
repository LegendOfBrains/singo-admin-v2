import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function DetailPage({ itemId, itemType, onBack, onDelete, onSave }) {
  // 현재 보고 있는 아이템(신고/문의) 정보 상태
  const [item, setItem] = useState(null);
  // 현재 상태(예: 접수 중, 처리 완료 등)
  const [currentStatus, setCurrentStatus] = useState('');
  // 드롭다운(상태 변경 메뉴) 열림/닫힘 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 아이템 종류에 따라 상태 옵션(예: 문의는 답변 완료/안함, 신고는 접수 중/처리 예정/완료)
  const getStatusOptions = () => {
    if (itemType === '문의사항') {
      return ['답변 완료', '답변 안함'];
    }
    return ['접수 중', '처리 예정', '처리 완료'];
  };

  // 아이템 종류에 따라 필드 라벨(문의자/신고자 등) 다르게 표시
  const getFieldLabels = () => {
    if (itemType === '문의사항') {
      return {
        content: '문의 내용',
        reporter: '문의자',
        date: '문의일'
      };
    }
    return {
      content: '신고 내용',
      reporter: '신고자',
      date: '신고일'
    };
  };

  // 컴포넌트가 처음 렌더링될 때 mock 데이터로 아이템 정보 불러오기
  useEffect(() => {
    // 실제 서버 대신 임시 데이터 사용
    const mockData = {
      1: {
        id: 1,
        content: '2학년 3반 에어컨이 고장났어요ㅠㅠㅠㅠㅠ\n\n급하게 수리가 필요합니다. 더운 날씨에 학생들이 힘들어하고 있어요. 빠른 조치 부탁드립니다.',
        reporter: '서진교',
        date: '2025.06.24',
        status: '접수 중'
      },
      2: {
        id: 2,
        content: '2학년 복도 정수기에서 이상한 맛이 나요ㅠㅠㅠㅠㅠ\n\n물에서 비린내가 나고 색깔도 조금 이상해 보여요. 확인 부탁드립니다.',
        reporter: '신민재',
        date: '2025.06.23',
        status: '처리 예정'
      }
    };

    // 해당 id의 데이터가 있으면 상태에 저장
    if (mockData[itemId]) {
      setItem(mockData[itemId]);
      setCurrentStatus(mockData[itemId].status);
    }
  }, [itemId]);

  // 상태 변경 드롭다운에서 선택 시 실행
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    setIsDropdownOpen(false);
  };

  // 저장 버튼 클릭 시 실행
  const handleSave = () => {
    if (onSave) {
      onSave(itemId, currentStatus); // 부모 컴포넌트에 저장 알림
    }
    alert('저장되었습니다.');
  };

  // 삭제 버튼 클릭 시 실행
  const handleDelete = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      if (onDelete) {
        onDelete(itemId); // 부모 컴포넌트에 삭제 알림
      }
    }
  };

  // 상태에 따라 색깔 다르게 반환
  const getStatusColor = (status) => {
    if (itemType === '문의사항') {
      switch (status) {
        case '답변 완료':
          return 'bg-green-100 text-green-800';
        case '답변 안함':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }

    switch (status) {
      case '접수 중':
        return 'bg-yellow-100 text-yellow-800';
      case '처리 예정':
        return 'bg-blue-100 text-blue-800';
      case '처리 완료':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 아이템 정보가 아직 없으면 로딩 표시
  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 라벨, 상태 옵션, 제목/본문 분리
  const labels = getFieldLabels();
  const statusOptions = getStatusOptions();
  const [title, ...bodyLines] = item.content.split('\n');

  return (
    <div className="max-w-4xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로 돌아가기</span>
        </button>
      </div>

      {/* 상세보기 카드 전체 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 오른쪽 상단: 삭제 버튼 */}
        <div className="flex justify-end items-center pr-6 pt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white">
            글 삭제
          </button>
        </div>

        {/* 상세 내용 영역 */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 왼쪽: 상세 내용 */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* 제목 + 작성자/날짜 */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                  <p className="text-sm text-gray-500">{item.reporter} | {item.date}</p>
                </div>

                {/* 본문 내용(여러 줄) */}
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed border-t pt-4">
                  {bodyLines.join('\n')}
                </div>
              </div>
            </div>

            {/* 오른쪽: 현황 관리(상태 변경, 저장) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  현황 관리
                </h3>

                <div className="space-y-4">
                  {/* 상태 변경 드롭다운 */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      현재 상태
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
                          {currentStatus}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* 드롭다운 메뉴 */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(status)}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                {status}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 저장 버튼 */}
                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
