import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { useArticleParams } from './hooks/useArticleParams';
import {
	WIDE_CONTENT_WIDTH,
	WIDE_IMAGE_WIDTH,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние открытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	// Использование кастомного хука для управления состоянием статьи
	const { formState, appliedState, handlers, handleApply, handleReset } =
		useArticleParams();

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	// Вычисление ширины изображения на основе ширины контента
	const imageWidth =
		appliedState.contentWidth.value === WIDE_CONTENT_WIDTH
			? WIDE_IMAGE_WIDTH
			: appliedState.contentWidth.value;

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
					'--image-width': imageWidth,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleToggleSidebar}
				formState={formState}
				handlers={handlers}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
