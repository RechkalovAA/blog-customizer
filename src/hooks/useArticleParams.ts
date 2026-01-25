import { useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

export const useArticleParams = () => {
	// Состояние формы (не примененное)
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Состояние страницы (примененное)
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	// Универсальный обработчик изменения полей (DRY принцип)
	const handleFieldChange = <K extends keyof ArticleStateType>(
		field: K,
		option: ArticleStateType[K]
	) => {
		setFormState((prev) => ({
			...prev,
			[field]: option,
		}));
	};

	// Объект с обработчиками через замыкания (логически связанные данные как объект)
	const handlers = {
		onFontFamilyChange: (option: OptionType) =>
			handleFieldChange('fontFamilyOption', option),
		onFontSizeChange: (option: OptionType) =>
			handleFieldChange('fontSizeOption', option),
		onFontColorChange: (option: OptionType) =>
			handleFieldChange('fontColor', option),
		onBackgroundColorChange: (option: OptionType) =>
			handleFieldChange('backgroundColor', option),
		onContentWidthChange: (option: OptionType) =>
			handleFieldChange('contentWidth', option),
	};

	// Обработчик применения стилей
	const handleApply = () => {
		setAppliedState(formState);
	};

	// Обработчик сброса настроек
	const handleReset = () => {
		setFormState(defaultArticleState);
		setAppliedState(defaultArticleState);
	};

	return {
		formState,
		appliedState,
		handlers,
		handleApply,
		handleReset,
	};
};
