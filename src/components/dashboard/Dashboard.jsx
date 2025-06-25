import React, { useState } from 'react';
import Header from '../common/Header';
import FacilityReports from './FacilityReports';
import SchoolLifeReports from './SchoolLifeReports';
import Inquiries from './Inquiries';
import DetailPage from '../detailPage/DetailPage';

export default function Dashboard({ user, onLogout }) {
  // 현재 선택된 탭(시설 신고, 학교생활 신고, 문의사항)
  const [selectedTab, setSelectedTab] = useState('시설 신고');
  // 현재 화면이 리스트인지 상세보기인지 상태 저장
  const [currentView, setCurrentView] = useState('list'); // 'list' 또는 'detail'
  // 상세보기에서 선택된 아이템 정보 저장
  const [selectedItem, setSelectedItem] = useState(null);

  // 리스트에서 아이템 클릭 시 상세보기로 전환
  const handleItemClick = (itemId, itemType) => {
    setSelectedItem({ id: itemId, type: itemType });
    setCurrentView('detail');
  };

  // 상세보기에서 뒤로가기 버튼 클릭 시 리스트로 전환
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedItem(null);
  };

  // 삭제 버튼 클릭 시 실행 (실제로는 API 호출해야 함)
  const handleDelete = (itemId) => {
    console.log('삭제:', itemId);
    handleBackToList();
  };

  // 저장 버튼 클릭 시 실행 (실제로는 API 호출해야 함)
  const handleSave = (itemId, status) => {
    console.log('저장:', itemId, status);
  };

  // 현재 탭과 화면 상태에 따라 보여줄 컴포넌트 결정
  const renderContent = () => {
    // 상세보기 화면일 때
    if (currentView === 'detail' && selectedItem) {
      return (
        <DetailPage
          itemId={selectedItem.id}
          itemType={selectedItem.type}
          onBack={handleBackToList}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      );
    }

    // 리스트 화면일 때, 선택된 탭에 따라 컴포넌트 보여줌
    switch (selectedTab) {
      case '시설 신고':
        return <FacilityReports onItemClick={(id) => handleItemClick(id, '시설 신고')} />;
      case '학교생활 신고':
        return <SchoolLifeReports onItemClick={(id) => handleItemClick(id, '학교생활 신고')} />;
      case '문의사항':
        return <Inquiries onItemClick={(id) => handleItemClick(id, '문의사항')} />;
      default:
        return <FacilityReports onItemClick={(id) => handleItemClick(id, '시설 신고')} />;
    }
  };

  // 실제로 화면에 보여지는 부분
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 (로그인한 사용자 이름, 로그아웃 버튼) */}
      <Header userName={user.name} onLogout={onLogout} />
      
      {/* 메인 컨텐츠 영역 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 리스트 화면일 때만 탭 메뉴 보여줌 */}
        {currentView === 'list' && (
          <div className="mb-8">
            <nav className="flex space-x-8">
              {/* 탭 버튼들 */}
              {['시설 신고', '학교생활 신고', '문의사항'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* 탭/상세보기 내용 */}
        {renderContent()}
      </div>
    </div>
  );
}