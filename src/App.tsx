import { CSSProperties } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { useArticleParams } from './hooks/useArticleParams';
import {
	WIDE_CONTENT_WIDTH,
	WIDE_IMAGE_WIDTH,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	// Использование кастомного хука для управления состоянием статьи
	const { formState, appliedState, handlers, handleApply, handleReset } =
		useArticleParams();

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
				formState={formState}
				handlers={handlers}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
